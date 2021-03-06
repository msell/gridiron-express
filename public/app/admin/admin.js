(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('rookiesApp').controller(controllerId, ['common', admin]);

    function admin(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;

        vm.title = 'Admin';
        vm.refreshPlayerData = refreshPlayerData;

        activate();

        function refreshPlayerData(){
          console.log('refresh player data');
        };

        function activate() {
            var promises = [];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Admin View'); });
        }
    }
})();
