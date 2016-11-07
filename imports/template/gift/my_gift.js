import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Questionnaires } from '../../api/questionnaires/questionnaires.js';

import './my_gift.html';

Template.myGift.onCreated(function() {
  this.subscribe("MyQuestionnaire");
});


Template.myGift.helpers({
  questionnaire: function(){
    return Questionnaires.findOne({'user.id': Meteor.userId() });
  }
});

Template.myGift.events({
  "click #foo": function(event, template){

  }
});
