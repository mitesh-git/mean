'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state','$mdDialog',
  function ($scope, $rootScope, Menus, MeanUser, $state,$mdDialog) {
    var vm = this;

    vm.menus = {};
    vm.hdrvars = {
      authenticated: MeanUser.loggedin,
      user: MeanUser.user,
      isAdmin: MeanUser.isAdmin
    };


    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu (name, defaultMenu) {
      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function (menu) {
        vm.menus[name] = menu
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('account', []);

    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function () {
      queryMenu('main', defaultMainMenu);
            vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
        isAdmin: MeanUser.isAdmin
      }
    });

    vm.logout = function () {
      MeanUser.logout()
    };
    vm.editProfile = function() {
      var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         controllerAs: 'userprofilectl',
         templateUrl: 'meanStarter/views/users/user-profile-edit.html',
         locals: {

         },
         controller:  function ($scope, $mdDialog) {

             $scope.profileuser = {
                 profile_id : vm.hdrvars.user._id,
                 profile_first_name : vm.hdrvars.user.first_name,
                 profile_last_name : vm.hdrvars.user.last_name,
                 profile_birth_date : vm.hdrvars.user.birth_date,
                 profile_state : vm.hdrvars.user.state,
                 profile_country : vm.hdrvars.user.country,
                 profile_username : vm.hdrvars.user.username,
                 profile_email : vm.hdrvars.user.email,
             };
             $scope.myDate = new Date();

             $scope.maxDate = new Date(
                 $scope.myDate.getFullYear()-18,
                 $scope.myDate.getMonth(),
                 $scope.myDate.getDate());


             $scope.updateProfile = function () {
                 MeanUser.updateprofile($scope.profileuser);
             };
             $scope.cancel = function () {
                  $mdDialog.hide();
             };
             $rootScope.$on('updateprofilefailed', function(){
                 $scope.updateProfileError = MeanUser.updateProfileError;
             });
         }
       });

    };
      vm.changepassword = function() {
          var parentEl = angular.element(document.body);
          $mdDialog.show({
              parent: parentEl,
              controllerAs: 'changepasswordctl',
              templateUrl: 'meanStarter/views/users/user-change-password.html',
              locals: {

              },
              controller:  function ($scope, $mdDialog) {
                  $scope.changepasswordcontrl = {};

                  $scope.SubmitPassword = function (){
                      MeanUser.changepassword($scope.changepasswordcontrl,vm.hdrvars.user._id);
                  };

                  $scope.cancel = function () {
                      $mdDialog.hide();
                  };
                  $rootScope.$on('Changepasswordfailed', function(){
                      $scope.changepasswordError = MeanUser.changepasswordError;
                  });
              }
          });

      };
    $rootScope.$on('logout', function () {
      vm.hdrvars = {
        authenticated: false,
        user: {},
        isAdmin: false
      };
      queryMenu('main', defaultMainMenu);
      $state.go('home');
    });
  }
]);
