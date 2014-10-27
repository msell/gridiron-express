(function(){
  'use strict';
    var controllerId = 'topnav';
    angular.module('rookiesApp').controller(controllerId,[topnav]);

    function topnav(){
        var vm = this;
        vm.leagues = [
            {"id": 13040, "name":"Rookies Report to Camp"},
            {"id": 39247, "name":"Violence Punctuated by Committee Meetings"}
        ];

        vm.selectedLeague = vm.leagues[0];
    }
})();