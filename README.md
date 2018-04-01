# Inventory Control

This project is separated in two github repositories, the [inventory-control-utfpr-api](https://github.com/igornfaustino/inventory-control-utfpr-api) is the back-end for this project, and the [inventory-control-utfpr](https://github.com/igornfaustino/inventory-control-utfpr) is the front-end repository

## Setup

To start code in this is needed to use this command to install all the dependencies needed in this repository

### Intallation

install all the dependencies

``` bash
$ npm i
```

or

``` bash
$ npm install
```

### run

to run the project type the follow command

```bash
$ npm start
```

### build

to build the react code in this repository just type the follow command

``` bash
$ npm run build
```

## Folder structure

the basic structure is

```
  my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── components/
    └── utils/
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

### Directory rule

As a general rule, if a module (a utility, component, etc.) is only used within another module, then I want it nested in the directory structure like so:

```
└── components/
    └── Button/
    └── Header/
        └── HeaderNav/
        └── Header.js
        └── Header.css
        └── Header.test.js
```

`<HeaderNav>` will only be referenced from within the `<Header>` component, so it lives as a child. A `<Button>` could be referenced from anywhere, so it lives at the top level.

