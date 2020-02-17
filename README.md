tyrian
======

Tyrian - The new look of gentoo.org

### Deployment

Please use the assets located on the CDN for live websites.
See assets-cdn.txt for the URLs.

### Development (local)

* `emerge net-libs/nodejs` to get node.js up and running (you will need at least npm v6.9.0)
* clone this repository
* run `npm install` in the repository root
* run `npm run dist` in the repository root
* Output appears in `dist/`

### Development (containerized)
* clone this repository
* run `make docker-run`
* Output appears in `dist/`
