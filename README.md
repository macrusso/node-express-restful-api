# Node RESTful API

[![Build Status](https://travis-ci.com/macrusso/node-express-restful-api.svg?branch=master)](https://travis-ci.com/macrusso/node-express-restful-api)

_Main part of this application was created around July of 2018. It has some outdated patterns and solutions. I decided to reuse it to play with Docker and Kubernetes._

### Basics

- node
- express
- mongo db
- babel

### Testing

- mocha
- chai

### Front-end

- [React Blog SPA](https://github.com/macrusso/blog-react-redux-saga-typescript)

# Installation

Before start, clone the repository.

Then in the command line, run:

```
$ cd node-express-restful-api
$ npm install
```

Get mongo db, with brew:

```
$ brew install mongodb
```

To start server, run:

```
$ mongod
$ npm run dev
```

Server will be listening on `localhost:8080`
