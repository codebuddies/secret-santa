import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';


import './gift_arrived.html';

Template.giftArrived.events({
  "click #confirmDelivery": function(event, template){
    Modal.show('receivedGiftModal');
  }
});
