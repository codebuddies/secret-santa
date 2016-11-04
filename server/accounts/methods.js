import {Accounts} from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {

  Accounts.loginServiceConfiguration.remove({
    service : 'slack'
  });

  Accounts.loginServiceConfiguration.insert({
    service     : 'slack',
    "clientId" : Meteor.settings.private.slack.clientId,
    "secret" : Meteor.settings.private.slack.clientSecret,
    "loginStyle" : "popup"
  });

  if(Meteor.users.find().count()===0){

    var id = Accounts.createUser({ username : 'admin', password : 'admin123' });

    if(id){
      Roles.addUsersToRoles(id, 'admin');
    }
  }

});

var loggingInUserInfo = function(user) {
  var response = HTTP.get("https://slack.com/api/users.info",
    {params:
      {token: user.services.slack.accessToken,
       user: user.services.slack.id,
       scope: "users:read"
      }
    });
  return response.data.ok && response.data;
};

let filterForSlackLogins = (user) => {
    const username = user.name;
    const profile = {
      time_zone: user.tz,
      time_zone_label: user.tz_label,
      time_zone_offset: user.tz_offset,
      firstname: user.profile.first_name,
      lastname: user.profile.last_name,
      avatar: {
        default: user.profile.image_72,
        image_192: user.profile.image_192,
        image_512: user.profile.image_512
      }
    }
    const email = user.profile.email;

    return filterdFields = {
      username: username,
      profile: profile,
      email : email
    }
}

let generateGravatarURL = (email) => {
  const gravatarHash = md5(email.toLowerCase());
  return{
    default : Meteor.settings.root_gravatar + gravatarHash + '?size=72',
    image_192 : Meteor.settings.root_gravatar + gravatarHash + '?size=192',
    image_512 : Meteor.settings.root_gravatar + gravatarHash + '?size=512'
  }
}


Accounts.onCreateUser(function(options, user) {

  if (user.services.slack){
    Roles.setRolesOnUserObj(user, ['user']);
    const user_info = loggingInUserInfo(user);
    const pickField = filterForSlackLogins(user_info.user)


    user.username = pickField.username;
    user.profile = pickField.profile;
    user.email = pickField.email;
    return user;
  }

  if(user.services.password){
    const avatar = '/default-avatar.png';
    const profile = {
      avatar:avatar
    }

    user.username = user.username;
    user.profile = profile;
    user.email = options.email;
    return user;
  }

});


// Accounts.onCreateUser(function(options, user) {
//   //adding user as a default role
//   Roles.setRolesOnUserObj(user, ['user']);
//   return user;
//
// });
