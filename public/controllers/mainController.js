angular.module('noTeRayesCoApp', [])

    .controller('mainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

        // True if Pilars have started
        $scope.pilares = false;

        $scope.days = 000;
        $scope.hours = 00;
        $scope.minutes = 00;
        $scope.seconds = 00;
        
        $http.get("getVisits").then(function (response) {
            $scope.nVisits = response.data;
        });


        // Audio path variable
        $scope.audio = new Audio('audio/audioFile.mp3');

        $scope.playMyAudio = function() {
            $scope.audio.play();
        };

        // Set the date we're counting down to
        $scope.countDownDate = new Date("Oct 7, 2017 00:00:00").getTime();

        // Update the count down every 1 second
        $scope.countDownFunction = $interval(function () {

          // Get todays date and time
          $scope.now = new Date().getTime();

          // Find the distance between now an the count down date
          $scope.distance = $scope.countDownDate - $scope.now;

          // Time calculations for days, hours, minutes and seconds
          $scope.days = Math.floor($scope.distance / (1000 * 60 * 60 * 24));
          $scope.hours = Math.floor(($scope.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          $scope.minutes = Math.floor(($scope.distance % (1000 * 60 * 60)) / (1000 * 60));
          $scope.seconds = Math.floor(($scope.distance % (1000 * 60)) / 1000);

          if ($scope.distance <= 0) {
            $scope.pilares = true;
            // If the count down is over, the interval is stopped
            $interval.cancel($scope.countDownFunction);
          }
        }, 1000);

    }]);
