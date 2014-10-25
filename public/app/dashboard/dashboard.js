(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('rookiesApp').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.leagueName = "Rookies report to camp";
        vm.record = "0 wins & 0 losses"
        vm.news = {
            title: 'Lebowski Ipsum',
            description: "Wal, I lost m'chain of thought here. But—aw hell, I done innerduced him enough. Dolor sit amet, consectetur adipiscing elit praesent ac magna justo. Hardly Dude, a new 'vette? The kid's still got, oh, 96 to 97 thousand, depending on the options. Pellentesque ac lectus quis elit blandit fringilla a ut turpis. It is a fucking game. You said so yourself, Dude—she kidnapped herself. Praesent felis ligula, malesuada. I've had a rough night, and I hate the fucking Eagles, man. Suscipit malesuada non, ultrices non. You make everything a fucking travesty! Urna sed orci ipsum. Would it be possible for me to get my twenty grand in cash? I gotta check this with my accountant of course. Placerat id condimentum rutrum, rhoncus ac lorem aliquam placerat posuere neque. Goodnight, sweet prince. At dignissim magna ullamcorper in aliquam sagittis massa ac. Yeah well, that's just, ya know, like, your opinion, man. Tortor ultrices faucibus curabitur. She's not my special lady, she's my fucking lady friend. I'm just helping her conceive, man! Eu mi sapien, ut ultricies. I don't know about you, but I take comfort in that. It's good knowin' he's out there, the Dude, takin' her easy for all us sinners. Shit. I sure hope he makes The finals. Welp, that about does her, wraps her all up. Things seem to've worked out pretty good for the Dude'n Walter, and it was a purt good story, dontcha think? Made me laugh to beat the band. Parts, anyway. Course—I didn't like seein' Donny go. But then, happen to know that there's a little Lebowski on the way. I guess that's the way the whole durned human comedy keeps perpetuatin' itself, down through the generations, westward the wagons, across the sands a time until— aw, look at me, I'm ramblin' again. Wal, uh hope you folks enjoyed yourselves. Ipsum morbi eget risus nulla nullam vel nisi enim, vel auctor ante morbi id. Fuck it Dude. Let's go bowling. Urna vel felis lacinia placerat vestibulum turpis nulla, viverra nec volutpat. It's a complicated case, Maude. Lotta ins, lotta outs, lotta what-have-yous. Ac, ornare id lectus. Well sir, it's this rug I have, really tied the room together. Cras pharetra faucibus tristique nullam non accumsan justo nulla facilisi integer. When he moved down to Venice he had to go door-to-door to tell everyone he's a pederast. Interdum elementum nulla, nec eleifend nisl. I want a fucking lawyer, man. I want Bill Kunstler. Euismod ac maecenas vitae eros velit, eu suscipit erat integer purus lacus. Let me tell you something, pendejo. You pull any your crazy shit with us, you flash a piece out on the lanes, I'll take it away from you and stick it up your ass and pull the fucking trigger til it goes \"click\". Pretium vel venenatis eu, volutpat."
        };
        vm.messageCount = 0;
        vm.league = [];
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getRoster()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getRoster() {
            return datacontext.getRoster().then(function (data) {
                return vm.people = data;
            });
        }
    }
})();