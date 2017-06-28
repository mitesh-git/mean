'use strict';
// Setting up route for the common pages
angular.module('mean.meanStarter')

    .config(['$meanStateProvider',

        // To define states for common pages
        function ($meanStateProvider) {
            $meanStateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'meanStarter/views/pages/dashboard.html',
                    resolve: {
                        loggedin: function (MeanUser) {
                            return MeanUser.checkLoggedin()
                        }
                    }
                })
                .state('contact-us', {
                    url: '/contact-us',
                    templateUrl: 'meanStarter/views/pages/contact-us.html',
                    controller:function($scope, $stateParams) {
                        $scope.contactus = {};
                    }
                })
            ;
        }
    ])

    // To define controllers
    .controller('ContactusController', ['$scope', '$rootScope','$http','MeanUser',  '$state', 'Global',
        function($scope, $rootScope, $http, MeanUser,$state, Global) {
            // This object will contain list of available social buttons to authorize
            $scope.socialButtonsCounter = 0;
            $scope.global               = Global;
            $scope.$state               = $state;
            $scope.contactus            = {};

            $scope.sendemail = function () {
                $http.post('/api/contact-us', {
                    name:       $scope.contactus.name,
                    message:    $scope.contactus.message,
                    email:      $scope.contactus.email
                })
                    .then(function(response) {
                        $scope.contactus = {};
                        console.log(response)
                    })
                    .catch(function(response) {
                        $scope.contactus = {};
                        console.log('error');
                        console.log(response);
                    });
            };
        }
    ])
;