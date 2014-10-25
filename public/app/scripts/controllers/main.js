'use strict';

/**
 * @ngdoc function
 * @name rookiesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rookiesApp
 */
angular.module('rookiesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
