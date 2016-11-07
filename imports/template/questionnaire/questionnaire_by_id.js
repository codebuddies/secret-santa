import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Questionnaires } from '../../api/questionnaires/questionnaires.js';

import './questionnaire_by_id.html';

Template.questionnaireById.onCreated(function() {
  this.subscribe("questionnaireById", FlowRouter.getParam('questionnaireId'));
});


Template.questionnaireById.helpers({
  questionnaire: function(){
    return Questionnaires.findOne({'_id': FlowRouter.getParam('questionnaireId') });
  }
});

Template.questionnaireById.events({
  "click #reportUser": function(event, template){
    Modal.show('reportUserModal', this);
  },
  "click #giftConfirmation": function(event, template){
    console.log(this);
  }
});
