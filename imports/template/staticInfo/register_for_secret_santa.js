import './register_for_secret_santa.html';

Template.registerForSecretSanta.events({
  'click .signIn': function(event) {
    var options = {
      requestPermissions: ['identify', 'users:read']
    };
    Meteor.loginWithSlack(options);
  }
});
