'use strict';

angular.module('goalsAppApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      resolve: {
        goals: ["goalService", function (goalService) {
          return goalService.findAll().then(function (result) {
            return result;
          });
        }],
        summary: ["goalService", function (goalService) {
          return goalService.summary().then(function (result) {
            return result;
          });
        }],
        metrics: ["goalService", function (goalService) {
          return goalService.metrics().then(function (result) {
            return result;
          });
        }]
      },
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    });
  });
