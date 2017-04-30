myApp.factory('UserService', ['$http', '$location', function($http, $location){
  let userObject = new User(); // instantiate a new userObject on factory load
  let teamObject = new Team(); // instantiate a new teamObject on factory load

  // --------AUTHENTICATION--------
  // login function for the LoginController
  function loginUser(tempUser) {
    return $http.post('/', tempUser).then(function(response) {
      if (response.data.username) { // user authenticated
        console.log('successful login from loginUser() in the factory, response =', response.data);
        return true;
      } else { // bad login attempt
        console.log('failed to login from LoginController.login(): ', response);
        return false;
      }
    }); // end $http.post()
  } // end login()

  // get user from the database
  function getUser() {
    $http.get('/user').then(function(response) {
      if (response.data.username) { // user has a curret session on the server
        // response.data === entire row from the users table in the DB
        // users table "id"
        userObject.setId(response.data.id);
        // users table "username"
        userObject.setUsername(response.data.username);
        if (response.data.first_name) { // user has first_name stored in database
          userObject.setFirstName(response.data.first_name);
        }
        if (response.data.phone) { // user has phone number stored in database
          userObject.setPhone(response.data.phone);
        }
        console.log('retrieved user info in factory: ', userObject);
      } else { // user has no session on the server
        // bounce them back to the login page
        $location.path("/home");
      }
    }); // end $http.get()
  } // end getUser()

  // logout the user
  function logout() {
    $http.get('/user/logout').then(function(response) {
      console.log('user logged out, clearing userObject:', userObject);
      userObject.clear();
      console.log('userObject cleared:', userObject);
      console.log('redirecting to /#/home');
      $location.path('/home');
    }); // end $http.get()
  } // end logout()
  // --------END AUTHENTICATION--------

  // --------'/teams' ROUTES--------
  // post new team to the "teams" table & add user as a manager to the "users_teams" table
  function postNewTeam(teamName) {
    teamObject.setName(teamName); // set team name
    teamObject.setCreatorId(userObject.getId()); // set team creator ID
    $http.post('/teams', teamObject).then(function(response) {
      let newTeamId = response.data.rows[0].id; // DB returns the ID of the team that was created
      teamObject.setId(newTeamId); // set the team's ID that was returned from the DB
      userObject.setCurrentTeam(newTeamId); // set ID of the current team the user is viewing
      userObject.setHasJoined(true); // user joins the current team by default (since they created the team)
      userObject.setIsManager(true); // user is a manager by default (since they created the team) -- can be changed later
      console.log('team added to the database', teamObject);
      console.log('manager status set', userObject);
      addPlayerToTeam(userObject); // add the team creator as a manager to the users_teams table
    });
  } // end postNewTeam()

  // add a player to the users_teams table
  function addPlayerToTeam(userObject) {
    console.log('adding player', userObject, 'to team', userObject.getCurrentTeam(), 'in the factory');
    $http.post('/teams/add-player', userObject).then(function(response) {
      console.log('back from DB in addPlayerToTeam with response:', response);
      alert('Team created successfully! You may now add games to your team\'s schedule.');
      $location.path("/team-schedule"); // redirect user to the newly created team's schedule screen
    });
  } // end addPlayerToTeam()
  // --------END '/teams' ROUTES--------

  // --------'/games' ROUTES--------
  // @TODO --ROUTE WORKING-- COME BACK TO THIS WHEN WE COME BACK TO THE TEAM-SCHEDULE BRANCH
  // get all of the teams a user is associated with from the database
  // user may be associated with only one team, or multiple
  // function getTeamsGames(teamId) {
  //   console.log('getTeamsGames in the factory for teamId', teamId);
  //   $http.get('/games/' + teamId).then(function(response) {
  //     let gamesArray = response.data.rows;
  //     console.log('back from DB in getTeamsGames with games:', gamesArray);
  //   });
  // } // end getUsersTeams()
  // --------END '/games' ROUTES--------


  // IF A REDIRECT IS NEEDED -- USE $location
  // NOT SURE IF A FUNCTION SPECIFICALLY FOR THE ACTION IS A GOOD THOUGHT
  // BUT DOES SEEM TO MAKE CODE MORE READABLE
  // NEED TO EXPORT IT IF IT'S TO BE USED BY CONTROLLERS
  // function redirectToLogin() {
  //   $location.path("/login");
  // }

  // -----CURRENTLY UNUSED ROUTES-----
  // NOT YET USED?
  // @TODO COME BACK WHEN WE GET BACK TO THE ALL-TEAMS SCREEN -- FOR USERS ON MULTIPLE TEAMS
  // get all of the teams a user is associated with from the database
  // user may be associated with only one team, or multiple
  // function getUsersTeams(userId) {
  //   console.log('getting all teams in the factory for userId', userId);
  //   $http.get('/teams/' + userId).then(function(response) {
  //     console.log('back from DB in getUsersTeams with response:', response);
  //   });
  // } // end getUsersTeams()

  // @TODO EDIT A TEAM
  // NOT YET USED?
  // edit a team's information in the database
  // function editTeamInfo(teamId) {
  //   console.log('editing team info in the factory for teamId', teamId);
  //   $http.put('/teams/' + teamId).then(function(response) {
  //     console.log('back from DB in editTeamInfo with response:', response);
  //   });
  // } // end editTeamInfo()
  //
  // @TODO DELETE A TEAM
  // // NOT YET USED?
  // // delete a team from the database
  // function deleteTeam(teamId) {
  //   console.log('deleting team in the factory, adios teamId', teamId);
  //   $http.delete('/teams/' + teamId).then(function(response) {
  //     console.log('back from DB in deleteTeam with response:', response);
  //   });
  // } // end deleteTeam()
  // -----END CURRENTLY UNUSED ROUTES-----

  return {
    userObject,
    teamObject,
    loginUser, // function for LoginController
    getUser,
    logout,
    postNewTeam,
  };
}]);
