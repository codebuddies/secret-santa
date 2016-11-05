import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Questionnaires } from '../../api/questionnaires/questionnaires.js';

import './assigned_questionnaire.html';

Template.assignedQuestionnaire.onCreated(function() {
  this.subscribe("MyAssignedQuestionnaire");
});


Template.assignedQuestionnaire.helpers({
  questionnaire: function(){
    return Questionnaires.findOne({'secret_buddy.id': Meteor.userId() });
  }
});

Template.assignedQuestionnaire.events({
  "click #reportUser": function(event, template){

  },
  "click #giftConfirmation": function(event, template){
    console.log(this);
  }
});
