#!/usr/bin/env bash

set -e

yarn
yarn build

git config user.email "oss@brianesimon.com"
git config user.name "Brian Simon"

git fetch origin gh-pages
git checkout gh-pages

rm index.html
rm -rf assets

mv dist/* .
git add .
git commit -m "deploy"
git push -u origin gh-pages