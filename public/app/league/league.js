(function () {
    'use strict';
    var controllerId = 'league';
    angular.module('rookiesApp').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.leagueName = "Rookies report to camp";
        vm.team = [];
        vm.owners = [];
        vm.league = [];
        vm.title = 'League';
        activate();

        function activate() {
            var promises = [getLeague()];
            common.activateController(promises, controllerId)
                .then(function () {
                    log('Activated League View');
                });
        }

        function getTeam(id) {
            return datacontext.getTeam(id).then(function (data) {
                return data.data;
            });
        }


        function getLeague() {
            return datacontext.getOwners().then(function (data) {
                vm.owners = data.data;
                var league = [];
                angular.forEach(vm.owners, function (value, key) {

                    datacontext.getTeam(String(value.id)).then(function (teamData) {
                            league.push(
                                {
                                    owner: angular.fromJson(value),
                                    team: teamData.data
                                }
                            )
                        }
                    );

                });
                return vm.league = league;
            });
        }
    }
})();