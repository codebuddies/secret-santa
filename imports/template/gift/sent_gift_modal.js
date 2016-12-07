import { ReactiveVar } from 'meteor/reactive-var';

import './sent_gift_modal.html';

Template.sentGiftModal.onCreated(function() {

  let template = Template.instance();

  template.processing = new ReactiveVar( false );

});


Template.sentGiftModal.helpers({
  processing() {
    return Template.instance().processing.get();
  }
});


Template.sentGiftModal.events({
  "click #confirm": function(event, template){
    event.preventDefault();
    const giftDetail = template.find('#giftDetail').value;

    if ($.trim(giftDetail) == '') {
      Bert.alert("Gift Details", 'warning', 'growl-top-right' );
      return;
    }

    const data = {
      giftDetail: giftDetail,
      senderId: Meteor.userId(),
      receiverId: this.user.id,
      letterId: this._id
    }

    template.processing.set( true );

   Meteor.call("giftSent", data, function(error, result){
     if(error){
       Bert.alert( error.reason, 'danger', 'growl-top-right' );
     }
     if(result){
       Bert.alert( 'Thanks for sending your gift! We hope that you will recieve your gift from your Secret Santa soon.', 'success', 'growl-top-right' );
       Modal.hide();
     }
   });

  },
  "click #cancle": function(event, template){
    event.preventDefault();
    Modal.hide();
  }
});


Template.sentGiftModal.onDestroyed(function () {
  this.processing.set( false );
});
