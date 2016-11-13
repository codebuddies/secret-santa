import './block_user_modal.html';

Template.blockUserModal.events({
  "click #confirm": function(event, template){
    event.preventDefault();
  //   var data = {
  //    userId: this.user.id,
  //    questionnaireId: this._id,
  //    category: $('input[name="reportCategory"]:checked').val(),
  //    reporterId: Meteor.userId()
  //  };
   //
  //  Meteor.call("reportUser", data, function(error, result){
  //    if(error){
  //      Bert.alert( error.reason, 'danger', 'growl-top-right' );
  //    }
  //    if(result){
  //      Bert.alert( 'Thanks for reporting inappropriate content.', 'success', 'growl-top-right' );
  //      Modal.hide();
  //    }
  //  });

  },
  "click #cancle": function(event, template){
    event.preventDefault();
    Modal.hide();
  }
});
