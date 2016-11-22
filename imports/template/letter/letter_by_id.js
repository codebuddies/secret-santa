import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Letters } from '../../api/letters/letters.js';

import './letter_by_id.html';

Template.letterById.onCreated(function() {
  this.subscribe("letterById", FlowRouter.getParam('letterId'));
});


Template.letterById.helpers({
  letter: function(){
    return Letters.findOne({'_id': FlowRouter.getParam('letterId') });
  }
});

Template.letterById.events({
  "click #blockUser": function(event, template){
    const data = {
      letterId: this._id,
      userId:this.user.id,
      santaId: this.secret_santa.id
    }

    var confirmBlockUser = confirm("Are Your sure ?");
    if (confirmBlockUser == true) {
      Meteor.call("blockUser", data, function(error, result){
        if(error){
          Bert.alert( error.reason, 'danger', 'growl-top-right' );
        }
        if(result){
          Bert.alert( 'User blocked', 'success', 'growl-top-right' );
        }
      });

    } else {
        Bert.alert( "You cancled your action", 'warning', 'growl-top-right' );
    }

  },
  "click #falseAlarm": function(event, template){

    const data = {
      letterId : this._id
    }
    Meteor.call("falseAlarm", data, function(error, result){
      if(error){
        Bert.alert( error.reason, 'danger', 'growl-top-right' );
      }
      if(result){
        Bert.alert( 'Letter approved', 'success', 'growl-top-right' );
      }
    });

  }
});
