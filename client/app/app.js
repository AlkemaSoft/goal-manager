'use strict';

angular.module('goalsAppApp', ['goalsAppApp.auth', 'goalsAppApp.admin', 'goalsAppApp.constants', 'chart.js',
    'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
