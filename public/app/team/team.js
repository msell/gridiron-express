(function () {
    'use strict';
    var controllerId = 'team';
    angular.module('rookiesApp').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.leagueName = "Rookies report to camp";
        vm.league = {};
        vm.messageCount = 0;
        vm.team = [];
        vm.title = 'League';
        activate();

        function activate() {
            var promises = [getTeam()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Team View'); });
        }

        function getTeam() {
            return datacontext.getTeam().then(function(data) {
                return vm.team = data;
            });
        }
    }
})();