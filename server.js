const fs = require('fs');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { response } = require('express');

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
var events = {
	1: {
		id: 1,
		title: 'Commissieborrel',
		description: 'Discover your potential and drink free beer.',
		date: '2019-09-12',
		time: '16:00',
		place: 'Shots in Shorts',
		creator: 'Syntaxis',
		editor: null
	},
	2: {
		id: 2,
		title: 'Grolsch',
		description: 'Brewery tour. (EUR 7.50)',
		date: '2019-09-18',
		time: '17:00',
		place: 'LunchLezing innovalor',
		creator: 'Syntaxis',
		editor: 'Frank'
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

app.get('/', function(req, rsp) {
	rsp.render('example', {
		date: new Date(),
		counter: ++counter,
		items: items
	});
});

app.post('/items', function(req, rsp) {
	items.push(req.body.item);
	rsp.redirect('/');
});

app.get('/main', function(req, rsp) {
	rsp.render('example.handlebars');
});
/*
 * END EXAMPLE.
 */

// login
app.get('/login', function(req, rsp) {
	if (req.cookies.login !== undefined) {
		rsp.redirect('/events');
	} else {
		rsp.render(__dirname + '/views/layouts/login.handlebars');
	}
});

app.post('/login', function(req, rsp) {
	rsp.cookie('login', req.body.item);
	rsp.redirect('/events');
});

//logout
app.post('/logout', function(req, rsp) {
	rsp.clearCookie('login');
	rsp.redirect('/login');
});

// events
app.get('/events', function(req, rsp) {
	if (req.cookies.login === undefined) {
		rsp.redirect('/login');
	} else {
		rsp.render(__dirname + '/views/layouts/event.handlebars', {
			username: req.cookies.login,
			events: events
		});
	}
});

// single event
app.get('/edit/:eventTitle', function(req, rsp) {
	if (req.cookies.login === undefined) {
		rsp.redirect('/login');
	} else {
		let event;
		for (let i = 1; i < nextEventId; i++) {
			if (events[i].title === req.params.eventTitle) {
				event = events[i];
			}
		}
		rsp.render(__dirname + '/views/layouts/eventname.handlebars', {
			username: req.cookies.login,
			event: event
		});
	}
});

//cancel event
app.post('/cancel', (req, rsp) => {
	if (req.cookies.login === undefined) {
		rsp.redirect('/login');
	} else {
		rsp.redirect('/events');
	}
});

//save event
app.post('/edit/:eventTitle/save', (req, rsp) => {
	if (req.cookies.login === undefined) {
		rsp.redirect('/login');
	} else {
		let event;
		let index = 0;
		for (let i = 1; i < nextEventId; i++) {
			if (events[i].title === req.params.eventTitle) {
				event = events[i];
				index = i;
			}
		}
		events[index] = {
			...event,
			title: req.body.eventname,
			description: req.body.eventdescription,
			date: req.body.eventdate,
			time: req.body.eventtime,
			editor: req.cookies.login
		};
		rsp.redirect('/events');
	}
});

//delete event
app.post('/edit/:eventTitle/delete', (req, rsp) => {
	if (req.cookies.login === undefined) {
		rsp.redirect('/login');
	} else {
		let event;
		let index = 0;
		for (let i = 1; i < nextEventId; i++) {
			if (events[i].title === req.params.eventTitle) {
				event = events[i];
				index = i;
			}
		}

		delete events[index];
		nextEventId--;
		rsp.redirect('/events');
	}
});

app.get('/add_event', (req, rsp) => {
	if (req.cookies.login === undefined) {
		rsp.redirect('/login');
	} else {
		rsp.render(__dirname + '/views/layouts/addevent.handlebars');
	}
});

app.post('/add_event', (req, rsp) => {
	if (req.cookies.login === undefined) {
		rsp.redirect('/login');
	} else {
		rsp.render(__dirname + '/views/layouts/addevent.handlebars');
	}
});

// Start accepting requests
const listener = app.listen(3000, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
