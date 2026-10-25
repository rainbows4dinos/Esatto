// Click through an exploration prototype before it is published or handed off.
//
// Setup, once, in a scratch folder:   npm i playwright
// Run from that folder:
//   node <skill>/scripts/check-prototype.mjs <prototype.html | http url> [--out dir] [--viewports 1440x900,390x844] [--shots]
//
// Checks, for every direction in the switcher:
//   - switching by click and by number key shows that direction, and it renders real content
//   - every primary interaction ([data-check] controls, or the round file's "checks") changes the page
//   - the first controls reached with Tab show a visible focus style
//   - no uncaught errors or console errors
// With --shots, saves a screenshot per direction x viewport x mode, named <direction>-<viewport>-<mode>.png,
// which construction uses as frame references. Exit code 1 when any check fails.
//
// The prototype contract is in references/prototype-contract.md.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const { chromium } = createRequire(resolve(process.cwd(), 'noop.js'))('playwright');
const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : dflt; };
const target = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--out' && args[args.indexOf(a) - 1] !== '--viewports');
if (!target) { console.error('usage: node check-prototype.mjs <prototype.html | url> [--out dir] [--viewports 1440x900,390x844] [--shots]'); process.exit(2); }
const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(resolve(target)).href;
const out = opt('--out', 'prototype-check');
const viewports = opt('--viewports', '1440x900').split(',').map((v) => v.split('x').map(Number));
const shots = args.includes('--shots');
mkdirSync(out, { recursive: true });

const results = [];
const pass = (name, detail = '') => results.push({ ok: true, name, detail });
const fail = (name, detail = '') => results.push({ ok: false, name, detail });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const [vw, vh] = viewports[0];
const page = await browser.newPage({ viewport: { width: vw, height: vh } });
const errors = [];
page.on('pageerror', (e) => errors.push('uncaught: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto(url);
await page.waitForLoadState('networkidle');

const round = await page.evaluate(() => {
  const el = document.getElementById('exploration-round');
  try { return el ? JSON.parse(el.textContent) : null; } catch (e) { return { __error: e.message }; }
});
if (!round) fail('round file', 'no <script type="application/json" id="exploration-round"> in the page');
else if (round.__error) fail('round file', 'not valid JSON: ' + round.__error);
else pass('round file', `round ${round.round ?? '?'}, ${(round.directions || []).length} directions`);

const ids = await page.$$eval('[data-direction]', (els) => [...new Set(els.map((e) => e.getAttribute('data-direction')))]);
if (!ids.length) { fail('direction switcher', 'no [data-direction] controls'); }
const expected = (round && round.directions || []).map((d) => d.screen || d.id);
for (const id of expected) if (!ids.includes(id)) fail('direction switcher', `round file direction ${id} has no [data-direction="${id}"] control`);

const panelFor = async (id) => (await page.$(`[data-direction-panel="${id}"]`)) || (await page.$('[data-direction-panel]:not([hidden])')) || (await page.$('main')) || (await page.$('body'));
const isActive = (id) => page.evaluate((id) => {
  const tab = document.querySelector(`[data-direction="${id}"]`);
  const panel = document.querySelector(`[data-direction-panel="${id}"]`);
  const tabOn = tab && (tab.getAttribute('aria-selected') === 'true' || tab.getAttribute('aria-pressed') === 'true' || tab.getAttribute('aria-current') === 'true');
  const panelOn = panel && !panel.hidden && panel.getBoundingClientRect().height > 0 && getComputedStyle(panel).display !== 'none';
  return { tabOn: !!tabOn, panelOn: !!panelOn, hasPanel: !!panel };
}, id);
const signature = (handle) => handle.evaluate((n) => {
  const t = n.innerHTML;
  let h = 0; for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) | 0;
  return h + ':' + t.length + ':' + Math.round(n.getBoundingClientRect().height) + ':' + window.scrollY;
});

const roundChecks = (round && Array.isArray(round.checks)) ? round.checks : [];
for (const [i, id] of ids.entries()) {
  const label = `direction ${id}`;
  // Each direction starts from a fresh load, so one direction's filters cannot empty the next.
  await page.reload();
  await page.waitForLoadState('networkidle');
  const errBefore = errors.length;
  // Switch by number key (starting from another direction), then by click.
  const other = ids.find((x) => x !== id);
  if (other) await page.click(`[data-direction="${other}"]`);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  if (i < 9 && other) {
    await page.keyboard.press(String(i + 1));
    await page.waitForTimeout(150);
    const k = await isActive(id);
    (k.tabOn || k.panelOn) ? pass(`${label}: number key ${i + 1}`) : fail(`${label}: number key ${i + 1}`, 'key did not activate this direction');
  }
  await page.click(`[data-direction="${id}"]`);
  await page.waitForTimeout(150);
  const s = await isActive(id);
  if (!(s.tabOn || s.panelOn)) fail(`${label}: tab`, 'click did not mark the direction active (aria-selected, aria-pressed, aria-current, or a visible [data-direction-panel])');
  const panel = await panelFor(id);
  const content = await panel.evaluate((n) => ({ text: n.innerText.trim().length, h: Math.round(n.getBoundingClientRect().height), controls: n.querySelectorAll('button, a[href], input, select, textarea, [tabindex]').length }));
  (content.text > 40 && content.h > 120) ? pass(`${label}: renders`, `${content.text} chars, ${content.h}px, ${content.controls} controls`)
    : fail(`${label}: renders`, `looks empty (${content.text} chars, ${content.h}px)`);

  // Primary interactions: round file checks for this direction, else every visible [data-check] in the panel.
  let checks = roundChecks.filter((c) => !c.directions || c.directions.includes(id));
  if (!checks.length) {
    checks = await panel.$$eval('[data-check]', (els) => els.filter((e) => e.getBoundingClientRect().width > 0)
      .map((e) => ({ name: e.getAttribute('data-check'), target: `[data-check="${e.getAttribute('data-check')}"]`, action: e.getAttribute('data-check-action') || (e.matches('input:not([type=checkbox]):not([type=radio]), textarea') ? 'type' : e.matches('select') ? 'select' : 'click'), value: e.getAttribute('data-check-value') || undefined })));
  }
  if (!checks.length) fail(`${label}: interactions`, 'no [data-check] controls and no round file checks; primary interactions are untested');
  for (const c of checks) {
    const el = await panel.$(c.target) || await page.$(c.target);
    if (!el) { fail(`${label}: ${c.name}`, `target ${c.target} not found`); continue; }
    const scope = c.expectIn ? (await page.$(c.expectIn)) || panel : panel;
    const before = await signature(scope);
    try {
      if (c.action === 'type') { await el.fill(c.value ?? 'a'); }
      else if (c.action === 'select') { const v = c.value ?? await el.evaluate((s) => (s.options[1] || s.options[0]).value); await el.selectOption(v); }
      else if (c.action === 'drag') { const to = await page.$(c.to); if (!to) throw new Error('drop target ' + c.to + ' not found'); await el.dragTo(to); }
      else if (c.action === 'key') { await el.focus(); await page.keyboard.press(c.value || 'Enter'); }
      else await el.click();
      await page.waitForTimeout(250);
      const after = await signature(scope);
      after !== before ? pass(`${label}: ${c.name}`, c.action || 'click') : fail(`${label}: ${c.name}`, `${c.action || 'click'} changed nothing in ${c.expectIn || 'the direction'}`);
    } catch (e) { fail(`${label}: ${c.name}`, e.message.split('\n')[0]); }
  }

  // Focus visibility on the first few tab stops inside the direction.
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  let checked = 0, invisible = [];
  for (let t = 0; t < 12 && checked < 3; t++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate((id) => {
      const a = document.activeElement;
      if (!a || a === document.body) return null;
      const panel = document.querySelector(`[data-direction-panel="${id}"]`);
      if (panel && !panel.contains(a)) return { skip: true };
      const c = getComputedStyle(a);
      const visible = (c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0) || (c.boxShadow && c.boxShadow !== 'none');
      return { visible, what: a.tagName.toLowerCase() + (a.className && typeof a.className === 'string' ? '.' + a.className.split(' ')[0] : '') };
    }, id);
    if (!f || f.skip) continue;
    checked++;
    if (!f.visible) invisible.push(f.what);
  }
  checked === 0 ? fail(`${label}: focus`, 'Tab reached no control in this direction')
    : invisible.length ? fail(`${label}: focus`, 'no visible focus style on ' + invisible.join(', ')) : pass(`${label}: focus`, `${checked} tab stops`);

  const newErrors = errors.slice(errBefore);
  newErrors.length ? fail(`${label}: errors`, newErrors.slice(0, 3).join(' | ')) : pass(`${label}: errors`, 'none');
}

if (shots && ids.length) {
  const modes = await page.$$eval('[data-mode]', (els) => [...new Set(els.map((e) => e.getAttribute('data-mode')))]);
  for (const [w, h] of viewports) {
    await page.setViewportSize({ width: w, height: h });
    for (const mode of modes.length ? modes : ['default']) {
      if (mode !== 'default') { await page.click(`[data-mode="${mode}"]`).catch(() => {}); }
      for (const id of ids) {
        await page.click(`[data-direction="${id}"]`).catch(() => {});
        await page.waitForTimeout(200);
        const panel = await page.$(`[data-direction-panel="${id}"]`);
        const file = `${out}/${id}-${w}x${h}-${mode}.png`;
        panel ? await panel.screenshot({ path: file }) : await page.screenshot({ path: file, fullPage: true });
      }
    }
  }
  pass('screenshots', `${out}/<direction>-<viewport>-<mode>.png`);
}

await browser.close();
const failed = results.filter((r) => !r.ok);
writeFileSync(`${out}/check.json`, JSON.stringify({ url, failed: failed.length, results }, null, 1));
for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.detail ? '  ' + r.detail : ''}`);
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed. Details in ${out}/check.json`);
process.exit(failed.length ? 1 : 0);
