#!/bin/sh
# POSIX sh, not bash!
die() {
	set +x
	echo "$*" 1>&2
	exit 1
}
# export for debugging
[ "$DEBUG" == "1" ] && set -x
# go to volume
cd /repo
npm install || die "FAIL:${PWD}: npm install failed"
npm run dist || die "FAIL:${PWD}: npm run dist failed"