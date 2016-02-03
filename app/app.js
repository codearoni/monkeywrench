angular.module('monkeyWrench', [])
  .config(function ($logProvider) {
      $logProvider.debugEnabled(true);
  })
  .run(function ($rootScope, $log, $http) {

       var serverConfig = {
        protocol: 'http',
        address: 'localhost',
        port: '14416'
      };

      $rootScope.initRoute = serverConfig.protocol + '://' + serverConfig.address + ':' + serverConfig.port + '/init';
      $rootScope.scriptRoute = serverConfig.protocol + '://' + serverConfig.address + ':' + serverConfig.port + '/scripts';
      $rootScope.runRoute = serverConfig.protocol + '://' + serverConfig.address + ':' + serverConfig.port + '/run';

      $rootScope.csInterface = new CSInterface();
      var jsxPath = $rootScope.csInterface.getSystemPath(SystemPath.EXTENSION) + '/jsx';
      $rootScope.csInterface.evalScript('$.init.evalFiles("' + jsxPath + '")');

      var pathData = {
          extension: $rootScope.csInterface.getSystemPath(SystemPath.EXTENSION)
      };
      var init = function () {
          $http.post($rootScope.initRoute, pathData).then(function (res) {
              $log.log(res.data);
          }, function (err) {
              $log.warn('There was an error initializing the app');
              $log.error(err);
          });
      };
      init();
  });

angular.module('monkeyWrench')
  .service('ServerService', function ($rootScope, $http, $log) {
      this.FetchScripts = function (cb) {
          $http.get($rootScope.scriptRoute).then(function (res) {
              cb(res.data);
          }, function (err) {
              $log.warn('There was an error connecting to the server');
              $log.error(err);
          });
      };
      this.RunScript = function (scriptName) {
          $http.post($rootScope.runRoute, {name: scriptName}).then(function (res) {
              $rootScope.csInterface.evalScript(res.data);
          }, function (err) {
              $log.warn('There was an error connecting to the server');
              $log.error(err);
          });
      };
  });

angular.module('monkeyWrench')
  .controller('MainCtrl', function ($scope, $log, ServerService) {
      $scope.scriptList = [];
      $scope.selectedScript = '';

      $scope.FetchScripts = function () {
          ServerService.FetchScripts(function (scripts) {
              $log.log('Scripts: ', scripts);
              $scope.scriptList = scripts;
          });
      };

      $scope.RunScript = function () {
          ServerService.RunScript($scope.selectedScript);
      };
  });
