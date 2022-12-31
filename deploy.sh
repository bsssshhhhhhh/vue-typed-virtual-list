#!/usr/bin/env bash

set -e

yarn
yarn build

git checkout gh-pages

rm index.html
rm -rf assets

mv dist/* .
git add .
git commit -m "deploy"
git push

git checkout gh-pages-src