"use strict"

import './is_moderator.html';
import './unauthorised.html';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Template.isModerator.helpers({
  target: function () {
    var loggedInUserId = Meteor.userId()

    if (!Roles.userIsInRole(loggedInUserId, ['admin','moderator'])) {
      return 'unauthorised'
    } else {
      return this.targetTemplate
    }
  }
})
