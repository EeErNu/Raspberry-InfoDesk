const Bundler = require('parcel-bundler');
const express = require('express');
const URL = require('url');
const crypto = require('crypto');
const base64url = require('base64url');
const axios = require('axios');
const cookieParser = require('cookie-parser');

var $ = require('jquery');

var Twit = require('twit');

//----------------------weather
var weather = require('weather-js');
//
// weather.find({search: 'Tallinn', degreeType: 'C'}, function(err, result) {
//   if(err) console.log(err);
//
//   // console.log(JSON.stringify(result[0].current.temperature));
// });

//----------------------

const env = process.env.NODE_ENV;
const config = require(`../../../config/${env}.json`);

const bundler = new Bundler('src/index.html', {
  watch: true,
  logLevel: 3,
});

const app = express();
app.use(cookieParser());

// var T1 = new Twit(secret);

var T = new Twit({
  consumer_key:         'a1ZHXxBcZsYuwTaSytrUzUvGH',
  consumer_secret:      'EgP5h6J0QhGgFCw1vTOQzNYRmlXTHb1dSzweAP8JCquqAibfO8',
  access_token:         '961682083381989376-yfr9z72h5zXSywvpWAuV9YoesAgJprA',
  access_token_secret:  'oOKsazM6HWA74mo4YR3kbUxMpoeY6M1IkQE2xcYBNm1EL',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});


// GeneralNews
  // @KerstiKaljulaid - 782910704953225216
  // @ratasjuri - 806373975894933504
  // @EstonianGovt - 40868132
var streamF = T.stream('statuses/filter', { track: ['#Estonia', '#Tallinn', '#Tartu'], follow: ['782910704953225216', '806373975894933504', '40868132']});

var newsF = [];

streamF.on('tweet', function (tweet) {
  newsF.unshift({
    id: tweet.id,
    name: tweet.user.screen_name,
    text: tweet.text
  });
  if (newsF.length > 2) {
    newsF = newsF.slice(0, 1);
  }
});

// TechNews
  // @Raspberry_Pi - 302666251
  // @SpaceX - 34743251
  // @ubuntu - 2480951
  // @elonmusk - 44196397
  // @linuxfoundation - 14706299
  // @newsycombinator- 14335498
  // @habrahabr
var stream = T.stream('statuses/filter', { follow: ['302666251', '34743251', '2480951', '44196397', '14706299', '14335498', '18191307']});

var tweets = [];

stream.on('tweet', function (tweet) {
  tweets.unshift({
    id: tweet.id,
    name: tweet.user.screen_name,
    text: tweet.text
  });
  if (tweets.length > 2) {
    tweets = tweets.slice(0, 1);
  }
});

// Receiveing bottom feed
app.get('/api/tweet', async (req, res) => {
    res.json(tweets);
});

app.get('/api/tweet/newsf', async (req, res) => {
    res.json(newsF);
});

// app.get('/api/tweet/newss', async (req, res) => {
//     res.json(newsS);
// });

app.get('/api/weather', async (req, res) => {
  weather.find({search: 'Tallinn', degreeType: 'C'}, function(err, result) {
    if(err) console.log(err);
    res.json(JSON.stringify(result[0].current.temperature));
  });
});

app.use(bundler.middleware());
app.listen(3000);
