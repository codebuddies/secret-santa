import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Letters } from '../../api/letters/letters.js';

import './assigned_letter.html';


Template.assignedLetter.onCreated(function() {
  this.subscribe("assignedLetter");
});


Template.assignedLetter.helpers({
  letter: function(){
    return Letters.findOne({'secret_santa.id': Meteor.userId() });
  }
});

Template.assignedLetter.events({
  "click #reportUser": function(event, template){
    Modal.show('reportLetterModal', this);
  },
  "click #giftConfirmation": function(event, template){
    Modal.show('sentGiftModal', this);
  }
});
