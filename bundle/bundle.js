/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	function requireAll(r) {
	   r.keys().forEach(r);
	 }
	requireAll(__webpack_require__(1));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./app.js": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);