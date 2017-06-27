(function() {
    'use strict';

    /* jshint -W098 */

    function MypackageController($scope,$state, Global, Mypackage, MeanUser,$stateParams,$resource,$mdDialog) {
        $scope.global = Global;


        $scope.CurrentUser = MeanUser.user.email;

        var UserTasks = $resource('/api/mypackage/usertasks');

        UserTasks.query(function (results) {
            $scope.usertasks = results;
        });

        $scope.taskid = $stateParams.taskid;
        $scope.usertasks = [];

        $scope.DailyTaskReport = {};
        $scope.checkbox = {};

        $scope.checkCircle = function() {
            Mypackage.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };

        $scope.AddDailyTask = function () {
            Mypackage.add(this.DailyTaskReport,$scope.CurrentUser);
            //$state.go('mypackage example page');
        };
        $scope.deleteTask = function (id) {
            var verifyBeforeDel = confirm('Are you sure you want to delete ?');
            if(verifyBeforeDel) {
                Mypackage.deletetask(id);
                var UserTasks = $resource('/api/mypackage/usertasks');

                //$state.go('mypackage example page');
            }
        };
        $scope.editTask = function($event) {
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                controller: DialogController,
                templateUrl: 'mypackage/views/edittask.html',
                locals: {
                    theScope: $scope
                }
            });
            function DialogController($scope, $mdDialog ) {
                $scope.editDailyTaskReport = $event;
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
                $scope.EditDailyTask = function(){
                    Mypackage.edit($scope.editDailyTaskReport,$scope.CurrentUser,$scope);
                }
            }
        };


        $scope.answer = function(answer) {
            $scope.alert('nice');
            //$mdDialog.hide(answer);
        };

        $scope.SendTaskEmail = function(){
            Mypackage.SendTaskEmail($scope.checkbox);
        };
        $scope.hdrvars = {
            authenticated: MeanUser.loggedin,
            user: MeanUser.user,
            isAdmin: MeanUser.isAdmin
        }
    }

    angular
        .module('mean.mypackage', ['ngMaterial'])
        .controller('MypackageController', MypackageController);

    MypackageController.$inject = ['$scope', '$state','Global', 'Mypackage','MeanUser', '$stateParams','$resource','$mdDialog'];

})();
