#!/usr/bin/env bash
set -e
./rebuild.py && nginx -g "daemon off;"
