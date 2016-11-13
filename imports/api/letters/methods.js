import { Meteor } from 'meteor/meteor';

import { Letters } from './letters.js';
import { Reports } from '../reports/reports.js';


Meteor.methods({
  'createNewLetter':function(data) {
    check(data,{
       firstname: String,
       lastname: String,
       categories: Match.Maybe([String]),
       introduction: String,
       preference: String,
       shippingAddress: Match.Maybe(String)
     });
    if (!this.userId) {
     throw new Meteor.Error('Letters.methods.createNewLetter.not-logged-in', 'Must be logged in to sent letter to santa.');
    }

    const user = Meteor.user();
    const letter = {
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

    const letterId = Letters.insert(letter);

    if (letterId) {
      Meteor.users.update({_id:user._id}, {$set:{
        'letter.sent':true
      }});

      return true;
    }



  }
});

Meteor.methods({
  reportLetter:function(data){
     check(data, {
       userId: String,
       letterId: String,
       category: String,
       reporterId: String
     });

     const actor = Meteor.user();
     const subject = Letters.findOne({_id:data.letterId}).user;

     if(data.reporterId !== actor._id){
       throw new Meteor.Error(500, "You are trying do something fishy.")
     }

     const matter = " as " + data.category + ".";

      const report = {
        actor_id : actor._id,
        actor_username : actor.username ,
        subject_id : subject.id,
        subject_username : subject.firstname,
        letter_id : data.letterId,
        createdAt : new Date(),
        read:[actor._id],
        action : 'reported',
        matter : matter,
        icon : 'fa-exclamation-circle',
        type : 'reported letter'
      }

      Reports.insert(report);
      Letters.update({_id:data.letterId}, {$set:{
        'reported':true
      }});

      return true;
  }
});

Meteor.methods({
  giftSent:function(data){
    check(data, {
      giftDetail: String,
      senderId: String,
      receiverId: String,
      letterId: String
    });

    if (!this.userId) {
     throw new Meteor.Error('Letters.methods.giftSent.not-logged-in', 'Must be logged in to add your gift details.');
    }

    const user = Meteor.user();
    const letter = Letters.findOne({_id:data.letterId});

    if(data.senderId !== user._id){
      throw new Meteor.Error(500, "You are trying do something fishy.")
    }

    Letters.update({_id:data.letterId}, {$set:{
      sent:true,
      'secret_stant.gift_details': data.giftDetail
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
     throw new Meteor.Error('Letters.methods.giftReceived.not-logged-in', 'Must be logged in to Receive your gift.');
    }

    const user = Meteor.user();

    if(data.receiverId !== user._id){
      throw new Meteor.Error(500, "You are trying do something fishy.")
    }

    Letters.update({'user.id':data.receiverId}, {$set:{
      received:true,
      gift_details: data.giftDetail
    }});

    return true;

  }
});
