'use strict';

describe('Component: AddgoalComponent', function () {

  // load the controller's module
  beforeEach(module('goalsAppApp'));

  var AddgoalComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AddgoalComponent = $componentController('AddgoalComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
