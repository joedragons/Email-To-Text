#!/bin/bash

LOCAL_SETTINGS=$(cat local.settings.json)
PACKAGE_JSON=$(cat package.json)

APP_NAME=$(echo $PACKAGE_JSON | jq -r .displayName)
# DOCKER_APP_NAME=$(echo $LOCAL_SETTINGS | jq -r .appName)
VERSION=$(echo $PACKAGE_JSON | jq -r .version)
PORT=$(echo $LOCAL_SETTINGS | jq -r .port)
API_PREFIX=$(echo $LOCAL_SETTINGS | jq -r .apiPrefix)

docker run -p $PORT:$PORT -d \
  -e APP_NAME=$APP_NAME \
  -e VERSION=$VERSION \
  -e PORT=$PORT \
  -e API_PREFIX=$API_PREFIX \
  --name mailtotext jisodl0/mailtotext:latest

docker logs mailtotext --follow
