console.log('games.js loaded');
var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');

// @TODO --ROUTE WORKING-- COME BACK TO THIS WHEN WE COME BACK TO THE TEAM-SCHEDULE BRANCH
// // '/games/:teamId' GET - get team's games from the "games" table
// router.get('/:teamId', function(req, res) {
//   var team_id = req.params.teamId;
//   console.log('getting games for team_id', team_id);
//   pool.connect(function(err, database, done) {
//     if (err) { // connection error
//       console.log('error connecting to the database:', err);
//       res.sendStatus(500);
//     } else { // we connected
//       // SELECT * FROM "games" WHERE "team_id" = 12 ORDER BY "date";
//       database.query('SELECT * FROM "games" WHERE "team_id" = $1 ORDER BY "date";', [team_id],
//         function(queryErr, result) { // query callback
//           done(); // release connection to the pool
//           if (queryErr) {
//             console.log('error making query', queryErr);
//             res.sendStatus(500);
//           } else {
//             console.log('successful insert into "teams"', result);
//             res.send(result);
//           }
//         }); // end query callback
//       } // end if-else
//     }); // end pool.connect
//   }); // end '/games/:teamId' GET

module.exports = router;
