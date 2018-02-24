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
basedir=$PWD
# create output directory:
mkdir -p assets
# install grunt
npm install -g grunt-cli || die "FAIL:${PWD}: npm install -g grunt-cli"
# setup
for d in sources/css/bootstrap sources/css/tyrian . ; do 
  cd $basedir/$d && npm install || die "FAIL:${PWD}: npm install failed"
done
# do the build
cd $basedir && grunt || die "FAIL:${PWD}: grunt"
