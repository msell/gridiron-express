'use strict';

/**
 * @ngdoc function
 * @name rookiesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rookiesApp
 */
angular.module('rookiesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
