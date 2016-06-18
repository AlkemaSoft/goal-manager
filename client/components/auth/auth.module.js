'use strict';

angular.module('goalsAppApp.auth', ['goalsAppApp.constants', 'goalsAppApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
