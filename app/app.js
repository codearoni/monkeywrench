// (function($){
//   var csInterface = new CSInterface();
//   var jsxPath = csInterface.getSystemPath(SystemPath.EXTENSION) + '/jsx';
//
//   csInterface.evalScript('$.init.evalFiles("' + jsxPath + '")');
//
//   $("#callJsx").click(function () {
//     csInterface.evalScript("$.getExampleObject", function (result) {
//       var exampleObject = JSON.parse(result);
//       console.debug(exampleObject);
//       $("#message span").text(exampleObject.message);
//     });
//   });
//
// })(jQuery);

angular.module('monkeyWrench', [])
  .config(function ($logProvider) {
      $logProvider.debugEnabled(true);
  })
  .run(function ($rootScope, $log, $http) {

      $rootScope.csInterface = new CSInterface();
      var jsxPath = $rootScope.csInterface.getSystemPath(SystemPath.EXTENSION) + '/jsx';
      $rootScope.csInterface.evalScript('$.init.evalFiles("' + jsxPath + '")');

      var pathData = {
          extension: $rootScope.csInterface.getSystemPath(SystemPath.EXTENSION)
      };
      var init = function () {
          $http.post('http://localhost:14416/init', pathData).then(function (res) {
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
          $http.get('http://localhost:14416/scripts').then(function (res) {
              cb(res.data);
          }, function (err) {
              $log.warn('There was an error connecting to the server');
              $log.error(err);
          });
      };
      this.RunScript = function (scriptName) {
          $http.post('http://localhost:14416/run', {name: scriptName}).then(function (res) {
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
