import { Meteor } from 'meteor/meteor';

import { Questionnaires } from './questionnaires.js';


Meteor.methods({
  'createNewQuestionnaire':function(data) {
    check(data,{
       firstname: String,
       lastname: String,
       categories: Match.Maybe([String]),
       introduction: String,
       preference: String,
       shippingAddress: Match.Maybe(String)
     });
    if (!this.userId) {
     throw new Meteor.Error('Questionnaires.methods.createNewQuestionnaire.not-logged-in', 'Must be logged in to make new questionnaire.');
    }

    const user = Meteor.user();
    const questionnaire = {
      categories: data.categories,
      introduction: data.introduction,
      preference: data.preference,
      shipping_address: data.shippingAddress,
      user:{
         id: user._id,
         name: user.profile.username,
         firstname: data.firstname,
         lastname: data.lastname,
         time_zone: user.profile.time_zone,
         avatar: user.profile.avatar.image_512
      }
    }

    const questionnaireId = Questionnaires.insert(questionnaire);

    if (questionnaireId) {
      Meteor.users.update({_id:user._id}, {$set:{
        questionnaire:true
      }});

      return true;
    }



  }
});
