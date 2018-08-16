angular.module('starter.loginctrl', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
          $state.go('tab.add');
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
});
