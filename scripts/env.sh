#!/bin/sh
ROOT_DIR=/usr/share/nginx/html/assets
for file in $ROOT_DIR/*.js*;
do
  sed -i 's|VITE_API_URL_PLACEHOLDER|'${VITE_API_URL}'|g' $file
  sed -i 's|VITE_API_CSRF_TOKEN_URL_PLACEHOLDER|'${VITE_API_CSRF_TOKEN_URL}'|g' $file
done