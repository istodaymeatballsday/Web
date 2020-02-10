#!/usr/bin/env bash
set -e
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
cd ..

docker build -t antonhager/meatballs .
docker push antonhager/meatballs
ssh antonhagermalm@staging.open.anton.pizza "bash -s" <scripts/deploy.sh
