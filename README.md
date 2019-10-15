Nugo Pagination
===================
This repository contains the nugo-pagination package.

![API Version](https://img.shields.io/badge/version-1.1.1-brightgreen.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Instalation

Using yarn:
```shell
$ yarn add nugo-pagination
```

Using npm:
```shell
$ npm i nugo-pagination
```

## Usage
```js
// Import
import Pagination from 'nugo-pagination'
```

```js
// Using
<Pagination
  totalRecords={[Number] Total number of records}
  pageSize={[Number] The number of records per page}
  pageNeighbours={[Number] Quantity of pages to be put left and right on the center number}
  onPageChange={[Func] Func to receive the pagination click callback}
/>

//Example
<Pagination
  totalRecords={50}
  pageSize={10}
  pageNeighbours={1}
  onPageChange={paginationChangeHandler}
/>
```


## Publishing (Development)

Follow these steps to publish the package:
1. Change the version package in package.json (https://semver.org/);
2. run the follow command: ```npm publish```


## Available Scripts (Development)

In the project directory, you can run:

### `yarn clean`

Remove all files from dist folder.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
