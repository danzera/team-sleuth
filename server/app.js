// BASE MODULES
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// AUTHENTICATION MODULES
var passport = require('./strategies/user_sql.js');
var session = require('express-session');

// ROUTE MODULES
var index = require('./routes/index.js');
var user = require('./routes/user.js');
var register = require('./routes/register.js');
var teams = require('./routes/teams.js'); // add new team, add player to a team
var games = require('./routes/games.js'); // add new game
var invite = require('./routes/invite.js'); // invite players to join team

// APP CONFIGURATION
app.set('port', (process.env.PORT || 6789));

// MIDDLEWARE CONFIGURATION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve('server/public')));

// PASSPORT SESSION CONFIGURATION
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// START PASSPORT SESSIONS
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/register', register);
app.use('/user', user);
app.use('/teams', teams);
app.use('/games', games);
app.use('/games', games);
app.use('/invite', invite);
app.use('/*', index);

// LISTEN
app.listen(app.get('port'), function(){
   console.log('listening on port:', app.get('port'));
});
