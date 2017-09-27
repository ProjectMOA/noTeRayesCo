angular.module('noTeRayesCoApp', [])

    .controller('visits', ['$scope', '$http', function ($scope, $http) {

        $http.get("getVisits").then(function (response) {
            $scope.nVisits = response.data;
        });

    }]);
