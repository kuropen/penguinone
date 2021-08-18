#!/bin/bash

BASEDIR=$(cd $(dirname $0) && pwd)

cd $(mktemp -d)
curl -L https://github.com/gohugoio/hugo/releases/download/v0.87.0/hugo_extended_0.87.0_Linux-64bit.tar.gz | tar zx
mv hugo $BASEDIR/hugo.linux

npm install -g postcss-cli autoprefixer postcss

cd $BASEDIR
./hugo.linux
