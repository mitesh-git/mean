(function() {
    'use strict';

    /* jshint -W098 */

    function DashboardController($scope, Global, Dashboard, $stateParams,$mdDialog,$resource) {
        $scope.global = Global;
        $scope.package = {
            name: 'dashboard'
        };
        $scope.dashboard = {};
    }

    angular
        .module('mean.dashboard', ['ngMaterial'])
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'Global', 'Dashboard', '$stateParams','$mdDialog','$resource'];

})();