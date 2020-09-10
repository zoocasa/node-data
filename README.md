# Node Data
|Branch|Tests|Coverage
|---|---|---
|master|[![Build Status](https://github.com/zoocasa/node-data/workflows/CI/badge.svg?branch=master)](https://github.com/zoocasa/node-data/actions?query=workflow%3ACI+branch%3Amaster)|[![Coverage](https://badges.zoostage.com/zoocasa/node-data/master.svg)](https://badges.zoostage.com/zoocasa/node-data/master.svg)
|development|[![Build Status](https://github.com/zoocasa/node-data/workflows/CI/badge.svg?branch=development)](https://github.com/zoocasa/node-data/actions?query=workflow%3ACI+branch%3Adevelopment)|[![Coverage](https://badges.zoostage.com/zoocasa/node-data/development.svg)](https://badges.zoostage.com/zoocasa/node-data/development.svg)

A library to standardize api calls and responses.

## Installation
```
yarn add @zoocasa/node-data
```

## Usage Examples
TODO...

## Development
1. Install dependencies: `yarn`
1. Run tests `yarn test` (tests automatically re-run when TypeScript src files change)
1. Start Coding!

## Release

This project is released through GitHub Actions workflows that:
1. Run the test suite and linters
1. Build the TypeScript codebase into a build folder with JavaScript and TypeScript type definition files.
1. Publish the build folder to the as a private package to GitHub Package Registry (GPR).
