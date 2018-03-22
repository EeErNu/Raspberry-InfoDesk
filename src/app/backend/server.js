const Bundler = require('parcel-bundler');
const express = require('express');
const URL = require('url');
const crypto = require('crypto');
const base64url = require('base64url');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const socketIo = require('socket.io');
const http = require('http');



var $ = require('jquery');

var Twit = require('twit');

//----------------------weather should be uncommented
// var weather = require('weather-js');
//----------------------

const env = process.env.NODE_ENV;
const config = require(`../../../config/${env}.json`);

const bundler = new Bundler('src/index.html', {
  watch: true,
  logLevel: 3,
});

const app = express();
app.use(cookieParser());

const request = require('request');

//socketIo test
const server = http.Server(app);
// const io = socketIo(server);
const io = socketIo(server);

// io.on("connection", socket => {
//   console.log("connected"), setInterval(
//     () => getApiAndEmit(socket),
//     10000
//   );
//   socket.on("disconnect", () => console.log("disconnected"));
// });

// const getApiAndEmit = async socket => {
//   try {
//     const res = await axios.get(
//       'https://todoist.com/api/v7/projects/get_data?token=2c8e334c6e6a73f85898a4c17c0526dfb55a0b08&project_id=2179066376'
//     );
//     socket.emit("FromAPI", res.data.items);
//   } catch(error) {
//     console.log(`Error: ${error.code}`);
//   }
// }
//end socketIo test

//Uncomment the code below whenever you are ready

// streamTech.on('tweet', function (tweet) {
//   io.emit('tweetTech', {
//     id: tweet.id,
//     text: tweet.text,
//     name: tweet.user.screen_name,
//   });
// });



// let todoists = [];

// var requestTodoistLoop = setInterval(function() {
//   request(urlT, (error, response, body) => {
//     const info = JSON.parse(body);
//
//     todoists = info.items.map(x => ({
//       content: x.content,
//       id: x.id,
//       added: x.date_added.substring(0, 6),
//       due: x.due_date_utc.substring(0, 6),
//     }))
//     if (todoists.length > 10) {
//       todoists = todoists.slice(0, 9);
//     }
//   });
// },10000);

// app.get('/api/todoist', async (req, res) => {
//     res.json(todoists);
// });

// let username = '2f4abda524b258de94bc6879268203c3',
//   password = 'api_token',
//   url = `http://${username}:${password}@toggl.com/api/v8/time_entries?start_date=2017-08-01T15%3A42%3A46%2B02%3A00`;
//
// let toggls = [];
//
// var requestTogglLoop = setInterval(function() {
//   request({ url }, (error, response, body) => {
//     const info = JSON.parse(body);
//     const dur = (info.map(x => x.duration));
//     const i = (info.map(x => x.duration));
//     const sum = dur.reduce((a, b) => a + b, 0);
//
//     const result = parseInt((sum / 60) / 60);
//
//     toggls.unshift({
//       // id: i,
//       id: i,
//       duration: result,
//     });
//
//     if (toggls.length > 1) {
//       toggls = toggls.slice(0, 1);
//     }
//   });
// },10000);

// app.get('/api/toggl', async (req, res) => {
//   res.json(toggls);
// });

// var dataWeather = [];
// weather.find({search: 'Nijmegen', degreeType: 'C'}, function(err, result) {
//   if(err) console.log(err);
//   dataWeather.unshift({
//     name: result[0].location.name,
//     temp: result[0].current.temperature,
//     text: result[0].current.skytext,
//     wind: result[0].current.winddisplay,
//     humid: result[0].current.humidity,
//
//     forecastLow: result[0].forecast[0].low,
//     forecastHigh: result[0].forecast[0].high,
//     forecastDay: result[0].forecast[0].shortday,
//     forceastDate: result[0].forecast[0].date
//   });
//
// });
//
// app.get('/api/weather', async (req, res) => {
//   res.json(dataWeather);
// });






// THE CODE BELOW IS READY TO USE | UNCOMMENT WHENEVER YOU READY

// TechNews

var T = new Twit({
  consumer_key:         'a1ZHXxBcZsYuwTaSytrUzUvGH',
  consumer_secret:      'EgP5h6J0QhGgFCw1vTOQzNYRmlXTHb1dSzweAP8JCquqAibfO8',
  access_token:         '961682083381989376-yfr9z72h5zXSywvpWAuV9YoesAgJprA',
  access_token_secret:  'oOKsazM6HWA74mo4YR3kbUxMpoeY6M1IkQE2xcYBNm1EL',
});

// var streamTech = T.stream('statuses/filter', { track: ['#USA', '#Donald', '#Trump', '#DonaldTrump', '#Donald_Trump', '#Estonia', '#Tallinn', '#Tartu'], follow: ['302666251', '34743251', '2480951', '44196397', '14706299', '14335498', '18191307']});
var streamTech = T.stream('statuses/filter', { track: '#USA'});

streamTech.on('tweet', function (tweet) {
  io.emit('tweetTech', {
    id: tweet.id,
    text: tweet.text,
    name: tweet.user.screen_name,
  });
});


// GeneralNews
// var streamGeneral = T.stream('statuses/filter', { track: ['#USA', '#Estonia', '#Tallinn', '#Tartu'], follow: ['782910704953225216', '806373975894933504', '40868132']});
var streamGeneral = T.stream('statuses/filter', { track: ['#DonaldTrump','#Trump', '#DonaldTrump', '#Donald_Trump']});

streamGeneral.on('tweet', function (tweet) {
  io.emit('tweetGeneral', {
    id: tweet.id,
    text: tweet.text,
    name: tweet.user.screen_name,
  });
});

// Todoist

io.on("connection", socket => {
  console.log("connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("disconnected"));
});

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      'https://todoist.com/api/v7/projects/get_data?token=2c8e334c6e6a73f85898a4c17c0526dfb55a0b08&project_id=2179066376'
    );
    let todoists = res.data.items.map(x => ({
      content: x.content,
      id: x.id,
      added: x.date_added.substring(0, 6),
      due: x.due_date_utc ? x.due_date_utc.substring(0, 6) : "null",
    }));
    socket.emit("todoist", todoists);
  } catch(error) {
    console.log(`Error: ${error.code}`);
  }
};

app.use(bundler.middleware());
server.listen(7070);
