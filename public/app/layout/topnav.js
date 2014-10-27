(function(){
  'use strict';
    var controllerId = 'topnav';
    angular.module('rookiesApp').controller(controllerId,[topnav]);

    function topnav(){
        var vm = this;
        vm.leagues = [{"name":"Rookies Report to Camp"},
            {"name":"Violence"},
            {"name":"Unicorns"}
        ];
    }
})();