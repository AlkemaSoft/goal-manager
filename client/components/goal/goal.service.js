'use strict';

angular.module('goalsAppApp')
  .service('goalService', function ($http) {
    return {
      findAll: function (options) {
        options = options || {};
        return $http.get('/api/goals', {params: options});
      },
      summary: function () {
        return $http.get('/api/goals/summary');
      },
      metrics: function () {
        return $http.get('/api/goals/metrics');
      },
      create: function (goal) {
        return $http.post('/api/goals', goal);
      },

      update: function (goal) {
        return $http.put('/api/goals/' + goal.id , goal);
      }
    }
  });
