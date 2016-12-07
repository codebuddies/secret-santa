import './layout.html';

Template.layout.events({
  "click .continue-popup": function(event, template){
    if (!Meteor.userId()) {
      sweetAlert({
        text:  "By continuing, I agree that I am at least 13 years old and have read and agree to the terms of service and privacy policy." ,
        showCancelButton: true,
        confirmButtonText: "Continue with Slack",
        cancelButtonText: "Not Now",
        background: '#235E6F',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      },
      function(){
        var options = {
          requestPermissions: ['identify', 'users:read']
        };
        Meteor.loginWithSlack(options);
      });
    }

  }
});
