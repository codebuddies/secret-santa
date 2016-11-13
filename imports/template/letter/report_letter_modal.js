import './report_letter_modal.html';

Template.reportLetterModal.events({
  "click #report": function(event, template){
    event.preventDefault();
    var data = {
     userId: this.user.id,
     letterId: this._id,
     category: $('input[name="reportCategory"]:checked').val(),
     reporterId: Meteor.userId()
   };

   Meteor.call("reportLetter", data, function(error, result){
     if(error){
       Bert.alert( error.reason, 'danger', 'growl-top-right' );
     }
     if(result){
       Bert.alert( 'Thanks for reporting inappropriate content.', 'success', 'growl-top-right' );
       Modal.hide();
     }
   });

  }
});
