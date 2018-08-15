angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
          $state.go('tab.dash');
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: '<center>Please check your credentials!</center>',
            buttons: [
              {
              type: 'button-royal',
              text: "OK"
              }
            ]
          });
      });
  }
})

.controller('HttpCtrl', function($scope, $rootScope, $http, $ionicPopup) {
  $scope.start = 0;
  $scope.end = 10;
  $rootScope.page = ($scope.start / 10) + 1;
  $http({
    method: 'GET', url: 'http://localhost/pt_admin/server/index.php/ionic',
    params: {start: $scope.start, end: $scope.end}
  }).then(function(response) {
    $scope.content = response.data.rows;
    $rootScope.total = Math.floor(response.data.total.count);
    $rootScope.pages = Math.floor($rootScope.total / 10);
  });

  $scope.nextparams = function(start, end) {
    $scope.start = Math.floor($scope.start + 10);
    if ($scope.start > ($rootScope.total - 10)) {
      $scope.start = Math.floor($rootScope.total - 10);
    }
    $scope.end = $scope.end + 10;
    $rootScope.page = Math.floor(($scope.start / 10)) + 1;
    $http({
      method: 'GET', url: 'http://localhost/pt_admin/server/index.php/ionic',
      params: {start: $scope.start, end: $scope.end}
    }).then(function(response) {
      $scope.content = response.data.rows;
    });

    return;
  };

  $scope.lastparams = function(start, end) {
    $scope.start = Math.floor($scope.start - 10);
    $scope.end = $scope.end - 10;
    if($scope.start < 0) {
      $scope.start = 0;
    }
    if($scope.end < 10) {
      $scope.end = 10;
    }
    $rootScope.page = Math.floor(($scope.start / 10)) + 1;
    $http({
      method: 'GET', url: 'http://localhost/pt_admin/server/index.php/ionic',
      params: {start: $scope.start, end: $scope.end}
    }).then(function(response) {
      $scope.content = response.data.rows;
    });

    return;
  };

  $scope.finalparams = function() {
    $scope.start = Math.floor($rootScope.total - 10);
    $rootScope.page = Math.floor($rootScope.pages);
    $http({
      method: 'GET', url: 'http://localhost/pt_admin/server/index.php/ionic',
      params: {start: $scope.start, end: $scope.end}
    }).then(function(response) {
      $scope.content = response.data.rows;
    });
  };

  $scope.firstparams = function() {
    $scope.start = 0;
    $rootScope.page = ($scope.start / 10) + 1;
    $http({
      method: 'GET', url: 'http://localhost/pt_admin/server/index.php/ionic',
      params: {start: $scope.start, end: $scope.end}
    }).then(function(response) {
      $scope.content = response.data.rows;
    });
  };

  $scope.addEntry = function(ent) {
    if(!ent.user || !ent.pass) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: '<center>You must enter a username and password</center>',
        buttons: [
          {
          type: 'button-royal',
          text: "OK"
          }
        ]
      });
      ent.user='';
      ent.pass='';
      return;
    }
    
    if(ent.user.length < 3 || ent.pass.length > 45) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: '<center>Your username must be between 3 and 45 chars long</center>',
        buttons: [
          {
          type: 'button-royal',
          text: "OK"
          }
        ]
      });
      ent.user='';
      ent.pass='';
      return;
    }

    if(ent.pass.length < 5 || ent.pass.length > 45) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: '<center>Your password must be between 5 and 45 chars long</center>',
        buttons: [
          {
          type: 'button-royal',
          text: "OK"
          }
        ]
      });
      ent.user='';
      ent.pass='';
      return;
    }

    $http({
      method: 'POST', url: 'http://localhost/pt_admin/server/index.php/ionic',
      params: {user: ent.user, pass: ent.pass}
    }).then(function(response) {
      $rootScope.addContent = response.data.msg;
    });
    var alertPopup = $ionicPopup.alert({
      title: 'New entry added!',
      // template: $rootScope.addContent,
      buttons: [
        {
        type: 'button-royal',
        text: "OK"
        }
      ]
    });
    ent.user='';
    ent.pass='';
    return;
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
