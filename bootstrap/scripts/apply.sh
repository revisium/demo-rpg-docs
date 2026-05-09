#!/usr/bin/env bash
# Convenience wrapper for apply.mjs.
#
# Usage:
#   REVISIUM_TOKEN=... ./apply.sh <organization>
#
# Applies both demo-rpg-data and demo-rpg-cms in dependency order.

set -euo pipefail

ORG=${1:?"usage: $0 <organization>"}
HERE=$(cd "$(dirname "$0")" && pwd)

node "$HERE/apply.mjs" --org "$ORG" --project demo-rpg-data --source "$HERE/../data"
node "$HERE/apply.mjs" --org "$ORG" --project demo-rpg-cms  --source "$HERE/../cms"

echo
echo "next steps:"
echo "  1. open https://cloud.revisium.io/$ORG/demo-rpg-data and commit the draft revision"
echo "  2. open https://cloud.revisium.io/$ORG/demo-rpg-cms  and commit the draft revision"
echo "  3. (optional) make both projects publicly readable"
