'use strict';

import mongoose from 'mongoose';
import moment from 'moment'

var schemaOptions = {
  toObject: {
    virtuals: true
  }
  ,toJSON: {
    virtuals: true
  }
};

var GoalSchema = new mongoose.Schema({
  description: String,
  dueDate: Date,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  completed: {
    type: Boolean,
    default: false
  },
  canceled: {
    type: Boolean,
    default: false
  }
}, schemaOptions);

GoalSchema.virtual('status').get(function () {
  var statusValue;
  var date = moment(this.dueDate);
  var now = moment();

  if(this.canceled) statusValue = 'Canceled';
  else if(this.completed) statusValue = 'Completed';
  else if(now > date) statusValue = 'Overdue';
  else statusValue = 'Active';
  return statusValue;
});

export default mongoose.model('Goal', GoalSchema);
