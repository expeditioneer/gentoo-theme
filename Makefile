all: assets

.PHONY: all assets docker-build docker-run

TS = $(shell date -u +%Y%m%d-%H%M%S)
TAG_TS = $(REPO):$(TS)
TAG_LATEST = $(REPO):latest

REPO = git.gentoo.org/sites/tyrian-theme
PWD = $(shell pwd)
CACHEDIR_EXT = $(PWD)/npm-cacache
CACHEDIR_VOL = /root/.npm/_cacache/

REPO_EXT = $(PWD)
REPO_VOL = /repo

assets: docker-run

docker-build:
	docker build \
		-t $(TAG_LATEST) \
		-t $(TAG_TS) \
		.

docker-run: docker-build
	@mkdir -p $(CACHEDIR_EXT)
	docker run \
		--volume $(REPO_EXT):$(REPO_VOL) \
		--volume $(CACHEDIR_EXT):$(CACHEDIR_VOL) \
		$(REPO):latest

docker-clean-images:
	docker rmi $(shell docker images "git.gentoo.org/sites/tyrian-theme" --filter before=git.gentoo.org/sites/tyrian-theme:latest --format '{{.Repository}}:{{.Tag}}')
docker-clean-container:
	docker rm $(shell docker ps --filter "ancestor=git.gentoo.org/sites/tyrian-theme" -a -q --no-trunc)
