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
