'use strict';

/**
 * @ngdoc directive
 * @name rookiesApp.directive:roster
 * @description
 * # roster
 */
angular.module('rookiesApp')
    .directive('roster', ['$http', function ($http) {
        return {
            restrict: 'E',
            replace: true,
            controllerAs: 'rosterCtrl',
            templateUrl: '/views/partials/roster.html',
            controller: function () {
               // this.roster = $http.get('/mockData/roster.json');
                this.foo = 'bar';
                this.roster = {
                    "team": "Fighting Okra",
                    "league": "Rookies Report to Camp",
                    "players": [
                        {"firstName": "Michael", "lastName": "Irvin", "position": "WR", "team": "Cowboys", "byeWeek": 4, "totalPoints": 0},
                        {"firstName": "Rodger", "lastName": "Staubauch", "position": "QB", "team": "Cowboys", "byeWeek": 4, "totalPoints": 0}
                    ]
                };
            }

        }
    }]);
