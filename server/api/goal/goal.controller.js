/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/goals              ->  index
 * POST    /api/goals              ->  create
 * GET     /api/goals/:id          ->  show
 * PUT     /api/goals/:id          ->  update
 * DELETE  /api/goals/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import moment from 'moment'
import Goal from './goal.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Get list of goals
exports.index = function (req, res) {
  var query = {};
  query['user'] = req.user._id;
  if (req.query.s) {
    query['$or'] = [
      {description: {$regex: new RegExp(req.query.s, "i")}}
    ];
  }
  Goal.find(query, function (err, goals) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(goals);
  });
};

// Get goals summary
exports.summary = function (req, res) {
  var query = {};
  query['user'] = req.user._id;
  Goal.find(query, function (err, goals) {
    if (err) {
      return handleError(res, err);
    }
    var summary = {
      active: 0,
      completed: 0,
      canceled: 0,
      overdue: 0
    };
    goals.forEach(function (goal) {
      switch (goal.status) {
        case 'Completed':
          summary.completed++;
          break;
        case 'Active':
          summary.active++;
          break;
        case 'Canceled':
          summary.canceled++;
          break;
        case 'Overdue':
          summary.overdue++;
          break;
      }
    });

    return res.json(summary);
  });
};

// Get Goals metrics
exports.metrics = function (req, res) {
  var query = {};
  query['user'] = req.user._id;
  Goal.find(query, function (err, goals) {
    if (err) {
      return handleError(res, err);
    }
    var metrics = {
      inception: [0, 0, 0, 0],
      thisMonth: [0, 0, 0, 0],
      yearToDate: [0, 0, 0, 0]
    };

    goals.forEach(function (goal) {
      var isThisMonth = ((moment().year() === moment(goal.dueDate).year()) && (moment().month() === moment(goal.dueDate).month()));
      var isThisYear = (moment().year() === moment(goal.dueDate).year());
      switch (goal.status) {
        case 'Completed':
          metrics.inception[0]++;
          if (isThisMonth) metrics.thisMonth[0]++;
          if (isThisYear) metrics.yearToDate[0]++;
          break;
        case 'Active':
          metrics.inception[1]++;
          if (isThisMonth) metrics.thisMonth[1]++;
          if (isThisYear) metrics.yearToDate[1]++;
          break;
        case 'Canceled':
          metrics.inception[2]++;
          if (isThisMonth) metrics.thisMonth[2]++;
          if (isThisYear) metrics.yearToDate[2]++;
          break;
        case 'Overdue':
          metrics.inception[3]++;
          if (isThisMonth) metrics.thisMonth[3]++;
          if (isThisYear) metrics.yearToDate[3]++;
          break;
      }
    });

    return res.json(metrics);
  });
};

// Gets a single Goal from the DB
export function show(req, res) {
  return Goal.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Goal in the DB
export function create(req, res) {
  if (req.body) req.body.user = req.user;
  return Goal.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Goal in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Goal.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(function () {
      var query = {};
      query['user'] = req.user._id;
      Goal.find(query, function (err, goals) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(200).json(goals);
      });
    })
    .catch(handleError(res));
}

// Deletes a Goal from the DB
export function destroy(req, res) {
  return Goal.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
