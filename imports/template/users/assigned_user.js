import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Questionnaires } from '../../api/questionnaires/questionnaires.js';

import './assigned_user.html';

Template.assignedUser.onCreated(function() {
  this.subscribe("MyAssignedQuestionnaire");
});


Template.assignedUser.helpers({
  questionnaire: function(){
    return Questionnaires.findOne({'secret_buddy.id': Meteor.userId() });
  }
});

Template.assignedUser.events({
  "click #reportUser": function(event, template){
    Modal.show('reportUserModal', this);
  },
  "click #giftConfirmation": function(event, template){
    Modal.show('sentGiftModal', this);
  }
});
