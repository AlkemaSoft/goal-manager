'use strict';

angular.module('goalsAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addgoal', {
        url: '/new',
        template: '<addgoal></addgoal>'
      });
  });
