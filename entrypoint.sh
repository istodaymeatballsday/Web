#!/usr/bin/env bash
set -e
./rebuild.py
cron
nginx -g "daemon off;"
