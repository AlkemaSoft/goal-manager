'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var goalCtrlStub = {
  index: 'goalCtrl.index',
  show: 'goalCtrl.show',
  create: 'goalCtrl.create',
  update: 'goalCtrl.update',
  destroy: 'goalCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var goalIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './goal.controller': goalCtrlStub
});

describe('Goal API Router:', function() {

  it('should return an express router instance', function() {
    expect(goalIndex).to.equal(routerStub);
  });

  describe('GET /api/goals', function() {

    it('should route to goal.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'goalCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/goals/:id', function() {

    it('should route to goal.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'goalCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/goals', function() {

    it('should route to goal.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'goalCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/goals/:id', function() {

    it('should route to goal.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'goalCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/goals/:id', function() {

    it('should route to goal.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'goalCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/goals/:id', function() {

    it('should route to goal.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'goalCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
