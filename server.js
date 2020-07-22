const fs = require('fs');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Create an express app
const app = express();

// Configure express to automatically decode WWW FORM bodies
app.use(bodyParser.urlencoded());

// Configure automatic cookie decoding into `rsp.cookie.myCookieName`.
app.use(cookieParser());

// Serve static data from the public direcotry
app.use(express.static('public'));

// Configure the express app to use the handlebars templating engine
// More info here: https://handlebarsjs.com/
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// 'Static data provider' (or actually just global state) to be used.
// Next week, we'll start using an actual database for this.
let events = {
  1: {
    id: 1,
    title: "Commissieborrel",
    description: "Discover your potential and drink free beer.",
    date: "2019-09-12",
    time: "16:00",
    creator: "Syntaxis",
    editor: null
  },
  2: {
    id: 2,
    title: "Grolsch",
    description: "Brewery tour. (EUR 7.50)",
    date: "2019-09-18",
    time: "17:00",
    creator: "Syntaxis",
    editor: "Frank"
  }
};
// Use this to obtain the id for new events.
let nextEventId = 3;


/*
 * EXAMPLE.
 * This code should be removed / modified.
 */

let counter = 0;
let items = [];

app.get('/', function(req,rsp) {
  rsp.render('example', {
    date: new Date,
    counter: ++counter,
    items: items
  });
});

app.post('/items', function(req,rsp) {
  items.push(req.body.item);
  rsp.redirect('/');
});

/*
 * END EXAMPLE.
 */


// Start accepting requests
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
