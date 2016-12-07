"use strict"

import './is_invalid.html';
import './suspended.html';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Template.isInvalid.helpers({
  target: function () {
    var loggedInUserId = Meteor.userId()

    if (Roles.userIsInRole(loggedInUserId, 'inactive')) {
      return 'suspended'
    } else {
      return this.targetTemplate
    }
  }
})
