#!/usr/bin/env bash

set -e

yarn
yarn build

git checkout gh-pages

mv dist/* .
git add .
git commit -m "deploy"
git push

git checkout gh-pages-src