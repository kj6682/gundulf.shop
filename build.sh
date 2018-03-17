#!/usr/bin/env bash
#
# use this PROD script to prepare the release of the bundle
#
export VERSION="1.0.0"

COUNTER_FILE="count.tmp"
BUILD=`cat $COUNTER_FILE`
((BUILD++))

set -e
set -o pipefail

npm run build
mvn clean install
git add .
git commit -m"release $VERSION.$BUILD"
git tag -a $VERSION.$BUILD -m "$VERSION.$BUILD"
git push heroku master
git push origin master
git push origin --tags
echo $BUILD > $COUNTER_FILE
