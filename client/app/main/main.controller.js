'use strict';

class MainController {

  constructor($scope, goals, summary, metrics, goalService, Auth, $state) {
    this.goalService = goalService;
    this.Auth = Auth;
    this.summary = {};
    this.$state = $state;

    this.Auth.isLoggedIn(function (loggedIn) {
      if (!loggedIn) {
        $state.go('login');
      }
    });

    $scope.goals = goals.data;
    $scope.summary = summary.data;

    $scope.search = function () {
      goalService.findAll({s: $scope.s}).then(function (res) {
        $scope.goals = res.data;
      });
    };

    $scope.markComplete = function (goal) {
      goal.completed = true;
      goal.canceled = false;
      goalService.update(goal).then(function (res) {
        goalService.summary().then(function (summary) {
          $scope.goals = res.data;
          $scope.summary = summary.data;
          goalService.metrics().then(function (metrics) {
            setMetrics(metrics);
          });
        });
      });
    };

    $scope.cancelGoal = function (goal) {
      goal.completed = false;
      goal.canceled = true;
      goalService.update(goal).then(function (res) {
        goalService.summary().then(function (summary) {
          $scope.goals = res.data;
          $scope.summary = summary.data;
          goalService.metrics().then(function (metrics) {
            setMetrics(metrics);
          });
        });
      });
    };

    var setMetrics = function (metrics) {
      $scope.labels = ['Completed', 'Active', 'Canceled', 'Overdue'];

      var inception = [];
      var thisMonth = [];
      var yearToDate = [];
      if(metrics.data) {
        inception = metrics.data.inception || [];
        thisMonth = metrics.data.thisMonth || [];
        yearToDate = metrics.data.yearToDate || [];
      }
      $scope.dataInception = [inception];
      $scope.dataThisMonth = [thisMonth];
      $scope.dataYearToDate = [yearToDate];
    };

    setMetrics(metrics);


  }
}

angular.module('goalsAppApp')
  .controller('MainController', MainController);
