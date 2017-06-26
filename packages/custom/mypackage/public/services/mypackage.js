(function() {
    'use strict';

    function Mypackage($http, $q,$location) {
        return {
            name: 'mypackage',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/mypackage/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            },
            add : function(DailyTaskReport,CurrentUser) {
                $http.post('/api/mypackage/addreport', {
                    task: DailyTaskReport.task,
                    task_status: DailyTaskReport.task_status,
                    date: DailyTaskReport.date,
                    remark : DailyTaskReport.remark,
                    user: CurrentUser
                })
                .then(function(response) {
                    $location.path('/mypackage/example');
                })
                .catch(function(response) {
                    console.log('error');
                    console.log(response);
                });
            },
            edit : function(DailyTaskReport,CurrentUser,$scope) {
                $http.put('/api/mypackage/editreport/'+DailyTaskReport._id, {
                    id: DailyTaskReport._id,
                    task: DailyTaskReport.task,
                    task_status: DailyTaskReport.task_status,
                    date: DailyTaskReport.date,
                    remark : DailyTaskReport.remark,
                    user: CurrentUser
                })
                .then(
                    function(response) {
                        $scope.closeDialog();
                        $location.path('/mypackage/example');
                    }
                )
                .catch(console.log('catch loop'));
            },
            deletetask : function (id) {
               $http.delete('/api/mypackage/deletetask/'+id)
                .then(
                    function(response){
                        $location.path('/mypackage/example');
                    }
                )
                .catch(
                    function(response) {
                        console.log('error');
                        console.log(response);
                    }
                );
            },
            SendTaskEmail : function (checkBoxValues) {
                $http.post('/api/mypackage/sendemail', checkBoxValues)
                .then(console.log('then loop'))
                .catch(console.log('catch loop'));
            }
        };
    }


    angular
        .module('mean.mypackage')
        .factory('Mypackage', Mypackage);

    Mypackage.$inject = ['$http', '$q','$location'];

})();
