const Bundler = require('parcel-bundler');
const express = require('express');
const URL = require('url');
const crypto = require('crypto');
const base64url = require('base64url');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const socketIo = require('socket.io');
const http = require('http');

var _ = require('lodash');

var $ = require('jquery');
var Twit = require('twit');

var weather = require('weather-js');

const env = process.env.NODE_ENV;
const config = require(`../../../config/${env}.json`);

const bundler = new Bundler('src/index.html', {
  watch: true,
  logLevel: 3,
});

const app = express();
app.use(cookieParser());

const request = require('request');

const server = http.Server(app);
const io = socketIo(server);


var dataWeather = [];

weather.find({search: 'Nijmegen, NLD', degreeType: 'C'}, function(err, result) {
  if(err) console.log(err);

  // console.log(result);

  dataWeather.unshift({
    name: result[0].location.name.substring(0, 8),
    temp: result[0].current.temperature,
    text: result[0].current.skytext,
    wind: result[0].current.winddisplay,
    humid: result[0].current.humidity
  });

  dataWeather.unshift(result[0].forecast.map(x => ({
    low: x.low,
    high: x.high,
    day: x.shortday,
    date: x.date.substring(5)
  })));
});

app.get('/api/weather', async (req, res) => {
  res.json(dataWeather);
});


// Toggl
let togglCash
const checkToggl = async () => {
  try {
    let username = '2f4abda524b258de94bc6879268203c3',
      password = 'api_token',
      url = `https://${username}:${password}@toggl.com/api/v8/time_entries?start_date=2017-08-01T15%3A42%3A46%2B02%3A00`;

    const res = await axios.get(url);

    let dur = (res.data.map(x => x.duration));
    let sum = dur.reduce((a, b) => a + b, 0);
    let result = parseInt((sum / 60) / 60);

    let toggls = res.data.map(x => ({
      duration: result,
      id: x.id
    }));

    if(!_.isEqual(todoCash, toggls)) {
      togglCash = toggls;
      io.sockets.emit("toggl", toggls);
    }
  } catch(error) {
    console.log(`Error: ${error.code}`);
  }
};

// Todoist
let todoCash;
const checkTodois = async () => {
  try {
    const res = await axios.get(
      'https://todoist.com/api/v7/projects/get_data?token=2c8e334c6e6a73f85898a4c17c0526dfb55a0b08&project_id=2179066376'
    );
    const todoists = res.data.items.map(x => ({
      content: x.content,
      id: x.id,
      added: x.date_added.substring(0, 6),
      due: x.due_date_utc ? x.due_date_utc.substring(0, 6) : "null",
    }));

    if(!_.isEqual(todoCash, todoists)) {
      todoCash = todoists;
      io.sockets.emit("todoist", todoists);
    }
  } catch(error) {
    console.log(`Error: ${error.code}`);
  }
};

io.on("connection", socket => {
  if (todoCash) {
      socket.emit('todoist', todoCash)
  }

  // if (weatherCash) {
  //     socket.emit('weather', weatherCash)
  // }
});

setInterval(checkTodois, 5000);
setInterval(checkToggl, 10000);
// setInterval(checkWeather, 10000);

// TechNews
var T = new Twit({
  consumer_key:         'a1ZHXxBcZsYuwTaSytrUzUvGH',
  consumer_secret:      'EgP5h6J0QhGgFCw1vTOQzNYRmlXTHb1dSzweAP8JCquqAibfO8',
  access_token:         '961682083381989376-yfr9z72h5zXSywvpWAuV9YoesAgJprA',
  access_token_secret:  'oOKsazM6HWA74mo4YR3kbUxMpoeY6M1IkQE2xcYBNm1EL',
});

var streamTech = T.stream('statuses/filter', { follow: ['302666251', '34743251', '2480951', '44196397', '14706299', '14335498', '18191307']});
// var streamTech = T.stream('statuses/filter', { track: ['#USA', '#UK']});

streamTech.on('tweet', function (tweet) {
  io.emit('tweetTech', {
    id: tweet.id,
    text: tweet.text,
    name: tweet.user.screen_name,
  });
});


// GeneralNews
var streamGeneral = T.stream('statuses/filter', { track: ['#Estonia', '#Tallinn', '#Tartu'], follow: ['782910704953225216', '806373975894933504', '40868132']});
// var streamGeneral = T.stream('statuses/filter', { track: ['#news', '#Trump', '#Donald_Trump']});

streamGeneral.on('tweet', function (tweet) {
  io.emit('tweetGeneral', {
    id: tweet.id,
    text: tweet.text,
    name: tweet.user.screen_name,
  });
});

app.use(bundler.middleware());
server.listen(7070);
