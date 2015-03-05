# chrome-storage demo app

The only way to demo chrome-storage is through a packaged chrome app or extension. This directory contains all the files necessary to install a simple chrome app that demonstrates the chrome-storage polymer element.

Due to [CSP](https://github.com/Polymer/vulcanize#content-security-policy) of chrome apps, polymer elements must be stripped of all inline scripts. This app uses [grunt-vulcanize](https://github.com/Polymer/grunt-vulcanize) to automatically handle this reformatting.

To rebuild the app after editing chrome-storage.html or demo/demo.html, run "grunt" to rebuild the app.

## Installation

Install this app by opening chrome and navigating to chrome://extensions. Make sure the "Developer mode" checkbox is checked. Then, drag this entire "demo" directory onto the extensions page.

The app will need to be reloaded if any code is modified. Do this by clicking the "Reload" link on the extensions page, or right clicking on the app and selecting "Reload app".
