const Bundler = require('parcel-bundler');
const express = require('express');
const URL = require('url');
const crypto = require('crypto');
const base64url = require('base64url');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const env = process.env.NODE_ENV;
const config = require(`../../../config/${env}.json`);

const bundler = new Bundler('src/index.html', {
  watch: true,
  logLevel: 3,
});

const app = express();
app.use(cookieParser());

app.use(bundler.middleware());
app.listen(3000);
