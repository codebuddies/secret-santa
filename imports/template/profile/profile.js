import './profile.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Questionnaires } from '../../api/questionnaires/questionnaires.js';

Template.profile.onCreated(function(){
  this.subscribe("userInformationById", FlowRouter.getParam('userId'));
  this.subscribe("questionnaireByUserId", FlowRouter.getParam('userId'));
});

Template.profile.helpers({
  userInfo: function(){
    return Meteor.users.findOne({'_id':FlowRouter.getParam('userId')});
  },
  questionnaire: function(){
    return Questionnaires.findOne({'user.id':FlowRouter.getParam('userId')});
  }
})
