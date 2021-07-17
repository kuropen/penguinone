#!/bin/bash

BASEDIR=$(dirname $0)

cd $(mktemp -d)
curl -L https://github.com/gohugoio/hugo/releases/download/v0.85.0/hugo_extended_0.85.0_Linux-64bit.tar.gz | tar zxv
cp hugo $BASEDIR/hugo.linux

npm install -g postcss-cli autoprefixer postcss

cd $BASEDIR/content/polaris
for u in $(cat .imagelist); do
    curl -LO $u
done

cd $BASEDIR
./hugo.linux
