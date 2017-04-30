myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
  let login = this; // reference to the controller
  login.message = '';
  login.tempUser = { // temp object used for login purposes
    username: '',
    password: ''
  };
  login.loginUser = function(tempUser) {
    if (tempUser.username === '' || tempUser.password === '') {
      login.message = 'Please enter your username and password!';
    } else { // username & password not blank - attempt to login with the provided credentials
      login.message = '';
      UserService.loginUser(tempUser).then(function(loginSuccess) {
        if (!loginSuccess) {
          login.message = 'Incorrect e-mail or password. Please try again.';
        } else {
          $location.path('/all-teams');
        }
      });
    } // end if-else login attemp
  }; // end login.loginUser

  login.registerUser = function() {
    if(login.tempUser.username === '' || login.tempUser.password === '') {
      login.message = "Choose a username and password!";
    } else {
      console.log('One Moment - Sending credentials to the server...', login.tempUser);
      $http.post('/register', login.tempUser).then(function(response) {
        console.log('great success');
        alert('Success! You may now login.'); // MAY WANT TO REMOVE?
        $location.path('/login');
      },
      function(response) {
        console.log('server error - user already exists most likely (maybe there are additional things that would cause this)');
        login.message = "Oops! Something went wrong. Please try again.";
      });
    }
  };
}]);
