import './sent_gift_modal.html';

Template.sentGiftModal.events({
  "click #confirm": function(event, template){
    event.preventDefault();
    const giftDetail = template.find('#giftDetail').value;

    if ($.trim(giftDetail) == '') {
      Bert.alert("Gift Details ", 'warning', 'growl-top-right' );
      return;
    }

    const data = {
      giftDetail: giftDetail,
      senderId: Meteor.userId(),
      receiverId: this.user.id,
      questionnaireId: this._id
    }

   Meteor.call("giftSent", data, function(error, result){
     if(error){
       Bert.alert( error.reason, 'danger', 'growl-top-right' );
     }
     if(result){
       Bert.alert( 'Thanks for sending a gift we hope that you will recieve your gift soon.', 'success', 'growl-top-right' );
       Modal.hide();
     }
   });

  },
  "click #cancle": function(event, template){
    event.preventDefault();
    Modal.hide();
  }
});
