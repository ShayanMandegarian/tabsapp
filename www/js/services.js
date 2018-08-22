angular.module('starter.services', [])

.service('LoginService', function($q, $http, $rootScope) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var allow = false;

            $http({
              method: 'GET', url: 'http://localhost/pt_admin/server/index.php/password',
              params: {user: name, pass: pw}
            }).then(function(response) {
              $rootScope.auth = response.data;

              if ($rootScope.auth == 'correct') {

                var allow = true;
              };

              if (allow) {
                  deferred.resolve('Welcome ' + name + '!');
              } else {
                  deferred.reject('Wrong credentials.');
              }
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('ListService', function($http, $rootScope) {
  return {
    normalList: function(start, end) {
      $http({
        method: 'GET', url: 'http://localhost/pt_admin/server/index.php/ionic',
        params: {start: start, end: end}
      }).then(function(response) {
        $rootScope.content = response.data.rows;
        $rootScope.total = Math.floor(response.data.count);
        $rootScope.pages = Math.floor($rootScope.total / $rootScope.end);
      });
    },
    addList: function(user, pass) {
      $http({
        method: 'POST', url: 'http://localhost/pt_admin/server/index.php/ionic',
        params: {user: user, pass: pass}
      }).then(function(response) {
        $rootScope.addContent = response.data.msg;
      });
    },
    searchList: function(phrase, start, end) {
      if (phrase == '') {
        ListService.normalList(start, end)
      }
      $http({
        method: 'GET', url: 'http://localhost/pt_admin/server/index.php/ionic',
        params: {start: start, end: end, phrase: phrase}
      }).then(function(response) {
        $rootScope.content = response.data.rows;
        $rootScope.total = Math.floor(response.data.count);
        $rootScope.pages = Math.floor($rootScope.total / $rootScope.end);
        if ($rootScope.phrase) {
          $rootScope.pages++;
        }
        // $rootScope.page = $rooScope.page - 1;
        $rootScope.term = phrase;
      });
    }
  }
});
