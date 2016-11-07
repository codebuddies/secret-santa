import { Meteor } from 'meteor/meteor';
import { Reports } from './reports.js';
import { Questionnaires } from '../questionnaires/questionnaires.js';

Meteor.methods({
  reportUser:function(data){
     check(data, {
       userId: String,
       questionnaireId: String,
       category: String,
       reporterId: String
     });

     const actor = Meteor.user();
     const subject = Questionnaires.findOne({_id:data.questionnaireId}).user;

     if(data.reporterId !== actor._id){
       throw new Meteor.Error(500, "You are trying do something fishy.")
     }

     const matter = " as " + data.category + ".";

      const report = {
        actorId : actor._id,
        actorUsername : actor.username ,
        subjectId : subject.id,
        subjectUsername : subject.firstname,
        questionnaireId : data.questionnaireId,
        createdAt : new Date(),
        read:[actor._id],
        action : 'reported',
        matter : matter,
        icon : 'fa-exclamation-circle',
        type : 'reported user'
      }

      Reports.insert(report);
      Questionnaires.update({_id:data.questionnaireId}, {$set:{
        'reported':true
      }});

      return true;
  }
});

Meteor.methods({
  unreadReportCount:function(){
    return Reports.find({'read':{$ne:this.userId}}).count();
  }
});

Meteor.methods({
  reportMarkAsRead:function(reportId){
    Reports.update({ _id: reportId },
                              {$push: { read: this.userId } });

  },
});
