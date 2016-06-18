'use strict';
(function(){

class AddgoalComponent {
  constructor($scope, goalService, $state, Auth, $location) {
    this.goalService = goalService;
    this.Auth = Auth;
    this.$state = $state;
    this.$location = $location;

    $scope.goal = {};

    Auth.isLoggedIn(function (loggedIn) {
      if (!loggedIn) {
        $state.go('login');
      }
    });

    $scope.openCalendar = function() {
      $scope.popupCalendar = true;
    };

    $scope.today = function() {
      console.log(new Date());
      $scope.goal.dueDate = new Date();
    };
    $scope.today();

    $scope.submit = function() {

      goalService.create($scope.goal)
        .success(function(data){
          $state.go('main');
        })
        .error(function(response){
          console.log(response)
        });
    };
  }
}

angular.module('goalsAppApp')
  .component('addgoal', {
    templateUrl: 'app/addgoal/addgoal.html',
    controller: AddgoalComponent
  });

})();
