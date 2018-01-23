# Code Themer

Injects user-configurable CSS to change the look and feel of code viewed on **GitHub**.

## Build

`npm install` the dependencies first. Then build the project with:

```bash

$ npm run build

```

## Install to Chrome

The files this extension depends on are created once the project is built.
Once built, navigate to ```chrome://extensions``` and load this project as an *unpacked extension*.

## Features

* Easy to add style configurations for websites, not only GitHub.
    Configurable style groups are *property sets*. For now, they exist as `.js` files in the `property-sets` folder. Styles are injected if the provided match URL matches with any open webpage.

## TODOs

* Use a data structure for organized loading of user-configured properties from storage and taking snapshots of user properties from the options page.
* Dynamically create the options page based on available property sets.
  * Using `React`.
* Configurable styles for GitHub classes.