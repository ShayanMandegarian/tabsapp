angular.module('starter.httpctrl', [])

.controller('HttpCtrl', function($scope, $rootScope, $http, $ionicPopup, ListService) {
  // sets the proper parameters and automatically fetches the first page of entries
  $scope.start = 0;
  $rootScope.end = 9;
  $rootScope.page = ($scope.start / $rootScope.end) + 1; // calculates current page
  ListService.normalList($scope.start, $rootScope.end);

  // function called when the 'next' button is pressed
  $scope.nextparams = function(start, end) {
    $scope.start = Math.floor($scope.start + $rootScope.end);
    if ($scope.start > ($rootScope.total - $rootScope.end)) { //ensures you can't scroll past last entry
      $scope.start = Math.floor($rootScope.total - $rootScope.end);
    }
    $rootScope.page = Math.floor(($scope.start / $rootScope.end)) + 1; //calculates page
    if ($rootScope.phrase != '') {
      ListService.searchList($rootScope.phrase, $scope.start, $rootScope.end);
      return;
    }
    ListService.normalList($scope.start, $rootScope.end);
    return;
  };

  // function called when the 'previous' button is pressed
  $scope.prevparams = function(start, end) {
    $scope.start = Math.floor($scope.start - $rootScope.end);
    if($scope.start < 0) { //ensures you can't scroll past the first entry
      $scope.start = 0;
    }
    $rootScope.page = Math.floor(($scope.start / $rootScope.end)) + 1;
    if ($rootScope.phrase != '') {
      ListService.searchList($rootScope.phrase, $scope.start, $rootScope.end);
      return;
    }
    ListService.normalList($scope.start, $rootScope.end);
    return;
  };

  // function called when the 'last' button is pressed
  $scope.finalparams = function() {
    $scope.start = Math.floor($rootScope.total - $rootScope.end);
    $rootScope.page = Math.floor($rootScope.pages);
    if ($rootScope.phrase != '') {
      ListService.searchList($rootScope.phrase, $scope.start, $rootScope.end);
      return;
    }
    ListService.normalList($scope.start, $rootScope.end);
  };

  // function called when the 'first' button is pressed
  $scope.firstparams = function() {
    $scope.start = 0;
    $rootScope.page = ($scope.start / $rootScope.end) + 1;
    if ($rootScope.phrase != '') {
      ListService.searchList($rootScope.phrase, $scope.start, $rootScope.end);
      return;
    }
    ListService.normalList($scope.start, $rootScope.end);
  };

  // this function is called when adding a new entry
  $scope.addEntry = function(ent) {
    if(!ent.user || !ent.pass) { // if either field is empty...
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

    if(ent.user.length < 3 || ent.pass.length > 45) { // username length check
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

    if(ent.pass.length < 5 || ent.pass.length > 45) { // password length check
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

    ListService.addList(ent.user, ent.pass);

    var alertPopup = $ionicPopup.alert({
      title: 'New entry added!',
      buttons: [
        {
        type: 'button-royal',
        text: "OK"
        }
      ]
    });
    ent.user='';
    ent.pass='';
    $scope.firstparams();
    // ListService.normalList(0, $rootScope.end);
     $rootScope.page = 1;
    return;
  };

  $scope.search = function(phrase) {
    $rootScope.phrase = phrase;
    if (phrase != '') {
      ListService.searchList(phrase, 0, $rootScope.end);
    }
  };

})
