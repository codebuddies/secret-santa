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

Meteor.methods({
  giftSent:function(data){
    check(data, {
      giftDetail: String,
      senderId: String,
      receiverId: String,
      questionnaireId: String
    });

    if (!this.userId) {
     throw new Meteor.Error('Questionnaires.methods.giftSent.not-logged-in', 'Must be logged in to add your gift details.');
    }

    const user = Meteor.user();
    const questionnaire = Questionnaires.findOne({_id:data.questionnaireId});

    if(data.senderId !== user._id){
      throw new Meteor.Error(500, "You are trying do something fishy.")
    }

    Questionnaires.update({_id:data.questionnaireId}, {$set:{
      sent:true,
      giftDetail: data.giftDetail
    }});

    return true;
  }
});

Meteor.methods({
  giftReceived:function(data){
    check(data, {
      giftDetail: String,
      receiverId: String,
    });

    if (!this.userId) {
     throw new Meteor.Error('Questionnaires.methods.giftReceived.not-logged-in', 'Must be logged in to Receive your gift.');
    }

    const user = Meteor.user();

    if(data.receiverId !== user._id){
      throw new Meteor.Error(500, "You are trying do something fishy.")
    }

    Questionnaires.update({'user.id':data.receiverId}, {$set:{
      received:true,
      giftDetail_2: data.giftDetail
    }});

    return true;

  }
});
