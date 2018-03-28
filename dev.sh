#!/usr/bin/env bash
# this is a DEV script
#
# use this DEV script to fully build the bundle with dev config
export VERSION="1.0.0"
export API_ROOT="http://localhost:8090"

export API_PRODUCTS="http://localhost:9000"
export API_ORDERS="http://localhost:9100"

set -e
set -o pipefail

#npm run build-dev
#mvn clean install
#./java -Dspring.profiles.active=dev $JAVA_OPTS -jar target/gundulf-$VERSION.jar
mvn clean spring-boot:run -P h2 -Drun.profiles=h2