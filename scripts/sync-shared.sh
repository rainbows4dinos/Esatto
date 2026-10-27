#!/usr/bin/env bash
# Copy shared/conventions.md into every skill (each folder with a SKILL.md) as references/conventions.md.
#   scripts/sync-shared.sh           write the copies
#   scripts/sync-shared.sh --check   exit 1 if any copy differs from the master (package.sh runs this)
set -euo pipefail
cd "$(dirname "$0")/.."
src=shared/conventions.md
[ -f "$src" ] || { echo "missing $src" >&2; exit 1; }
stale=0
for f in */SKILL.md; do
  s="$(dirname "$f")"
  dst="$s/references/conventions.md"
  if [ "${1:-}" = "--check" ]; then
    cmp -s "$src" "$dst" || { echo "out of date: $dst (run scripts/sync-shared.sh)" >&2; stale=1; }
  else
    mkdir -p "$s/references"
    cp "$src" "$dst"
    echo "$dst"
  fi
done
exit $stale
