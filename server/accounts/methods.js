import {Accounts} from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {

  if(Meteor.users.find().count()===0){

    var id = Accounts.createUser({ username : 'admin', password : 'admin123' });

    if(id){
      Roles.addUsersToRoles(id, 'admin');
    }
  }

});


Accounts.onCreateUser(function(options, user) {
  //adding user as a default role
  Roles.setRolesOnUserObj(user, ['user']);
  return user;

});
