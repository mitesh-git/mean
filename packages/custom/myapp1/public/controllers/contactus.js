(function() {
    'use strict';

    /* jshint -W098 */

    function ContactusController($scope, Global, Contactus, $stateParams,$mdDialog,$resource) {
        $scope.global = Global;
        $scope.package = {
            name: 'contactus'
        };
        $scope.contactus = {};

        $scope.SendEmail = function () {
            Contactus.sendmail(this.contactus);
            //$state.go('mypackage example page');
        };
    }

    angular
        .module('mean.contactus', ['ngMaterial'])
        .controller('ContactusController', ContactusController);

    ContactusController.$inject = ['$scope', 'Global', 'Contactus', '$stateParams','$mdDialog','$resource'];

})();