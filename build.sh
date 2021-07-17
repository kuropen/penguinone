#!/bin/bash

BASEDIR=$(dirname $0)

cd $BASEDIR/content/polaris
for u in $(cat .imagelist); do
    curl -LO $u
done

cd $BASEDIR
hugo
