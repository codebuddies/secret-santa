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
  "click #blockUser": function(event, template){
    Modal.show('blockUserModal', this);
  },
  "click #falseReport": function(event, template){
    Modal.show('falseReport', this);
  }
});
