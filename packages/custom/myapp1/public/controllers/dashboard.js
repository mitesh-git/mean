(function() {
    'use strict';

    /* jshint -W098 */

    function DashboardController($scope, Global, Dashboard, $stateParams,$mdDialog,$resource, MeanUser) {
        $scope.global = Global;
        $scope.package = {
            name: 'dashboard'
        };
        $scope.dashboard = {
            authenticated: MeanUser.loggedin,
            user: MeanUser.user,
            isAdmin: MeanUser.isAdmin
        };
    }

    angular
        .module('mean.dashboard', ['ngMaterial'])
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'Global', 'Dashboard', '$stateParams','$mdDialog','$resource', 'MeanUser'];

})();