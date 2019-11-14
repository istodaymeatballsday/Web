#!/usr/bin/env bash
set -ex
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"

if [[ $(docker ps -a | grep "meatballs") ]]; then
	docker rm -f meatballs
fi
docker rmi meatballs

docker pull antonhager/meatballs:latest
docker run -d \
	--name meatballs \
	--network meatballs \
	--restart always \
	--label "traefik.enable=true" \
	--label "traefik.http.middlewares.https-redirect.redirectscheme.scheme=https" \
	--label "traefik.http.routers.meatballs-http.entrypoints=web" \
	--label "traefik.http.routers.meatballs-http.rule=Host(\`istodaymeatballsday.com\`)" \
	--label "traefik.http.routers.meatballs-http.middlewares=https-redirect" \
	--label "traefik.http.routers.meatballs.entrypoints=web-secure" \
	--label "traefik.http.routers.meatballs.rule=Host(\`istodaymeatballsday.com\`)" \
	--label "traefik.http.routers.meatballs.tls=true" \
	--label "traefik.http.routers.meatballs.tls.certresolver=anton-pizza" \
	antonhager/meatballs:latest
