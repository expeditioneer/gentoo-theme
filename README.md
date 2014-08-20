tyrian
======

Tyrian – The new look of gentoo.org

### Deployment

Please use the assets located on the CDN for live websites.
See assets-cdn.txt for the URLs.

### Development
* `emerge net-libs/nodejs` to get node.js up and running
* clone this repository (don't forget to `init` and `update` the git submodules)
* `cd sources/css/tyrian/`
* run `npm install` and `npm install grunt-cli`
* run grunt `./node_modules/grunt-cli/bin/grunt all`

