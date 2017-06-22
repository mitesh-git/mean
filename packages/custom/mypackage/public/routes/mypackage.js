(function() {
    'use strict';

    /*
    function Mypackage($stateProvider) {
        $stateProvider.state('mypackage example page', {
            url: '/mypackage/example',
            templateUrl: 'mypackage/views/index.html'
        }).state('mypackage circles example', {
            url: '/mypackage/example/:circle',
            templateUrl: 'mypackage/views/example.html'
        });
    }

    angular
        .module('mean.mypackage')
        .config(Mypackage);

    Mypackage.$inject = ['$stateProvider'];
    */
    function Mypackage($stateProvider) {
        $stateProvider.state('mypackage example page', {
            url: '/mypackage/example',
            templateUrl: 'mypackage/views/index.html'
        }).state('mypackage circles example', {
            url: '/mypackage/example/:circle',
            templateUrl: 'mypackage/views/example.html'
        }).state('Daily Task List', {
            url: '/mypackage/newtask',
            templateUrl: 'mypackage/views/newtask.html'
        }).state('Edit Task', {
            url: '/mypackage/edittask',
            templateUrl: 'mypackage/views/edittask.html'
        });
    }

    angular
        .module('mean.mypackage')
        .config(Mypackage);

    Mypackage.$inject = ['$stateProvider'];


})();
