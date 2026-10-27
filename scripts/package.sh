#!/usr/bin/env bash
# Rebuild one zip per skill in zips/, for uploading to claude.ai (Settings > Capabilities > Skills).
# Run after any change to a skill, then re-upload the changed zips. Uploaded copies do not update themselves.
#   scripts/package.sh            every skill (each folder with a SKILL.md)
#   scripts/package.sh inspect-figma sync-design-system
set -euo pipefail
cd "$(dirname "$0")/.."
scripts/sync-shared.sh --check || { echo 'error: shared/conventions.md copies are stale; run scripts/sync-shared.sh' >&2; exit 1; }
mkdir -p zips
skills=("$@")
[ ${#skills[@]} -eq 0 ] && for f in */SKILL.md; do skills+=("$(dirname "$f")"); done
for s in "${skills[@]}"; do
  s="${s%/}"
  [ -f "$s/SKILL.md" ] || { echo "skip $s (no SKILL.md)"; continue; }
  name=$(sed -n 's/^name:[[:space:]]*//p' "$s/SKILL.md" | head -1)
  [ "$name" = "$s" ] || { echo "error: $s/SKILL.md has name '$name', expected '$s'" >&2; exit 1; }
  rm -f "zips/$s.zip"
  # -X drops extra attributes; excludes keep macOS metadata and caches out of the upload
  zip -qrX "zips/$s.zip" "$s" -x '*.DS_Store' '*/__MACOSX/*' '*/__pycache__/*' '*/node_modules/*'
  echo "zips/$s.zip  $(unzip -l "zips/$s.zip" | tail -1 | awk '{print $2}') files  $(git log -1 --format=%h -- "$s" 2>/dev/null)"
done
