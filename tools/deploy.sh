#!/bin/bash
# Publishes the danloudlabs.com Worker from the repos (no more pasting in the dashboard).
#
#   tools/deploy.sh check     join the sources in .deploy/ and check they bundle (nothing is sent)
#   tools/deploy.sh local     run it on this Mac (http://localhost:8787) to compare pages
#   tools/deploy.sh upload    upload a new version to Cloudflare WITHOUT serving it
#   tools/deploy.sh live      upload a version and serve it on danloudlabs.com (mac_run asks first)
#
# Wrangler runs through ~/Developer/DanloudMCP/cloudflare/wrangler.sh (Cloudflare token kept out of
# sight). Images are not deployed here: they are served from GitHub after git push.
set -euo pipefail
cd "$(dirname "$0")/.."
WRANGLER="$HOME/Developer/DanloudMCP/cloudflare/wrangler.sh"
AURA="../aura-calendar-web/worker"

assemble() {
    rm -rf .deploy
    mkdir -p .deploy
    cp worker/*.js .deploy/
    [[ -d "$AURA" ]] || { echo "Missing $AURA (clone aura-calendar-web next to this repo)." >&2; exit 1; }
    for file in "$AURA"/*.js; do
        name="$(basename "$file")"
        if [[ -f "worker/$name" ]]; then echo "Name clash: $name is in both repos." >&2; exit 1; fi
        cp "$file" .deploy/
    done
    echo "› .deploy: $(ls .deploy | wc -l | tr -d ' ') modules ($(ls worker/*.js | wc -l | tr -d ' ') from this repo, $(ls "$AURA"/*.js | wc -l | tr -d ' ') from aura-calendar-web)"
}

case "${1:-check}" in
    check)  assemble; "$WRANGLER" deploy --dry-run --outdir .deploy-bundle 2>&1 | tail -5 ;;
    local)  assemble; "$WRANGLER" dev --local --port 8787 ;;
    upload) assemble; "$WRANGLER" versions upload --message "${2:-From $(git rev-parse --short HEAD)}" ;;
    live)
        # Upload a version, then send 100 % of traffic to it. "versions deploy" never touches the
        # domains (plain "wrangler deploy" would manage them from this file).
        assemble
        output="$("$WRANGLER" versions upload --message "${2:-From $(git rev-parse --short HEAD)}" 2>&1)"
        echo "$output" | tail -6
        version="$(echo "$output" | grep -Eo 'Worker Version ID: [0-9a-f-]+' | awk '{print $4}')"
        [[ -n "$version" ]] || { echo "No version ID in Wrangler's output." >&2; exit 1; }
        "$WRANGLER" versions deploy "$version@100%" --yes --message "${2:-From $(git rev-parse --short HEAD)}" 2>&1 | tail -6
        ;;
    *) echo "Usage: tools/deploy.sh check|local|upload|live" >&2; exit 1 ;;
esac
