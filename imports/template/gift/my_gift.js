import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { Letters } from '../../api/letters/letters.js';

import './my_gift.html';

Template.myGift.onCreated(function() {
  this.subscribe("myLetter");
});


Template.myGift.helpers({
  letter: function(){
    return Letters.findOne({'user.id': Meteor.userId() });
  }
});
