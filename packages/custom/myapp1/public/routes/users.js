'use strict';
// Setting up route
angular.module('mean.meanStarter')
    .controller('ContactusController', ['$scope', '$rootScope','$http','MeanUser',  '$state', 'Global',
        function($scope, $rootScope, $http, MeanUser,$state, Global) {
            // This object will contain list of available social buttons to authorize
            $scope.socialButtonsCounter = 0;
            $scope.global = Global;
            $scope.$state = $state;
            $scope.contactus = {};

            $scope.sendemail = function () {
                $http.post('/api/contact-us', {
                    name: $scope.contactus.name,
                    message: $scope.contactus.message,
                    email: $scope.contactus.email
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
    /*.config(function(vcRecaptchaServiceProvider){
        vcRecaptchaServiceProvider.setSiteKey('6LcpAicUAAAAABnTkZZWK33uBWeHU5ESqtxB77KQ')
        vcRecaptchaServiceProvider.setTheme('light')
        vcRecaptchaServiceProvider.setStoken('6LcpAicUAAAAAKadNPgpFQ8HvllXdfkviWekezZz')
        vcRecaptchaServiceProvider.setSize('normal')
        vcRecaptchaServiceProvider.setType('image')
        vcRecaptchaServiceProvider.setLang('en')
    })*/
    .config(['$meanStateProvider',
      function ($meanStateProvider) {
        // states for users
        $meanStateProvider
          .state('auth', {
            url: '/auth',
            abstract: true,
            templateUrl: 'meanStarter/views/users/index.html'
          })
          .state('auth.login', {
            url: '/login',
            templateUrl: 'meanStarter/views/users/login.html',
            resolve: {
              loggedin: function (MeanUser) {
                return MeanUser.checkLoggedOut()
              }
            }
          })
          .state('auth.register', {
            url: '/register',
            templateUrl: 'meanStarter/views/users/register.html',
            resolve: {
              loggedin: function (MeanUser) {
                return MeanUser.checkLoggedOut()
              }
            }
          })
          .state('forgot-password', {
            url: '/forgot-password',
            templateUrl: 'meanStarter/views/users/forgot-password.html',
            resolve: {
              loggedin: function (MeanUser) {
                return MeanUser.checkLoggedOut()
              }
            }
          })
          .state('reset-password', {
            url: '/reset/:tokenId',
            templateUrl: 'meanStarter/views/users/reset-password.html',
            resolve: {
              loggedin: function (MeanUser) {
                return MeanUser.checkLoggedOut()
              }
            }
          })
          .state('contact-us', {
            url: '/contact-us',
            templateUrl: 'meanStarter/views/users/contact-us.html',
            controller:function($scope, $stateParams) {
                $scope.contactus = {};
            }
          });
      }
    ]);
