tyrian
======

Tyrian – The new look of gentoo.org

### Deployment

Please use the assets located on the CDN for live websites.
See assets-cdn.txt for the URLs.

### Development

* `emerge net-libs/nodejs` to get node.js up and running
* `sudo npm install -g grunt-cli` to get grunt(1)
* clone this repository (don't forget to `init` and `update` the git submodules)
* run `npm install` in the repository root as well as in `sources/css/{bootstrap,tyrian}`
* run `grunt`
