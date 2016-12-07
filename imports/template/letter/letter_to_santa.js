import './letter_to_santa.html';
import { ReactiveVar } from 'meteor/reactive-var';

Template.letterToSanta.onCreated(function() {

  let template = Template.instance();

  template.processing = new ReactiveVar( false );

});

Template.letterToSanta.helpers({
  processing() {
    return Template.instance().processing.get();
  }
});

Template.letterToSanta.events({
  "click #submit": function(event, template){
    event.preventDefault();

     var categories = [];// checked item will be stored in here

     $('input[name=things]:checked').each(function() {
       categories.push($(this).val());
     });
     var firstname = template.find('#firstname').value;
     var lastname = template.find('#lastname').value;
     var introduction = template.find('#introduction').value;
     var preference =  $('input:radio[name=preference]:checked').val();
     var shippingAddress = '';

     if ($.trim(firstname) == '') {
       Bert.alert("Please fill in your first name!", 'warning', 'growl-top-right' );
       return;
     }

     if ($.trim(lastname) == '') {
       Bert.alert("Please fill in your last name!", 'warning', 'growl-top-right' );
       return;
     }

     if (categories.length < 2) {
       Bert.alert("Please select at least select three interests. ", 'warning', 'growl-top-right' );
       return;
     }

     if ($.trim(introduction) == '') {
       Bert.alert("Please introduce yourself!", 'warning', 'growl-top-right' );
       return;
     }

     if (preference === "physical") {
       shippingAddress = template.find('#shippingAddress').value;
       if ($.trim(shippingAddress) == '') {
         Bert.alert("What is your shipping address?", 'warning', 'growl-top-right' );
         return;
       }
     }

     const data = {
       firstname: firstname,
       lastname: lastname,
       introduction: introduction,
       preference: preference,
       categories: categories,
       shippingAddress: shippingAddress,
     }


     template.processing.set( true );

     Meteor.call("createNewLetter", data, function(error, result){
       if(error){
         Bert.alert(error.error, 'danger', 'growl-top-right' );
       }
       if(result){
          Bert.alert("Success!", 'success', 'growl-top-right' );
          template.processing.set( false );
       }
     });


  },
  "click #preference": function(event, template){
    var shippingAddressBox = '<div class="form-group"> <label for="comment">Shipping address :</label> <textarea class="form-control" rows="5" id="shippingAddress"></textarea> </div>';
    var preference =  $('input:radio[name=preference]:checked').val();

    if (preference === "physical") {
      $("#shippingAddressBox").append(shippingAddressBox);
    }else {
      $("#shippingAddressBox").empty();
    }

  }
});

Template.letterToSanta.onDestroyed(function () {
  this.processing.set( false );
});
