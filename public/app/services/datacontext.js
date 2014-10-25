(function () {
  'use strict';

  var serviceId = 'datacontext';
  angular.module('rookiesApp').factory(serviceId, ['$http','common', datacontext]);

  function datacontext($http, common) {
    var $q = common.$q;

    var service = {
      getOwners: getOwners,
      getLeague: getLeague,
      getTeam: getTeam
    };

    return service;


    function getOwners(){
      var url = 'http://whoshouldibench.herokuapp.com/mfl_leagues/13040/mfl_rosters?callback=JSON_CALLBACK';
      return getData(url);
    }
    function getLeague() {
      var url = 'http://whoshouldibench.herokuapp.com/mfl_leagues/13040/mfl_rosters?callback=JSON_CALLBACK';
      return getData(url);
    }
    function getTeam(id) {
      var url = 'http://whoshouldibench.herokuapp.com/mfl_leagues/13040/mfl_rosters/' + id;
      //var url = 'http://localhost:3000/mfl_leagues/13040/mfl_rosters/' + id;
      return getAjaxData(url);
    }

    function getAjaxData(url){
      return $q.when($http.get(url).success(function(data){
        console.log(data);
      }).error(function(data, status){
        console.log('error');
      }));
    }

    function getData(url){
      return $q.when($http.jsonp(url).success(function(data){
        console.log(data);
      }).error(function(data, status){
        console.log('error');
      }));
    }

  }
})();
