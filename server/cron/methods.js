import { Letters } from '../../imports/api/letters/letters.js';
import {SyncedCron} from 'meteor/percolate:synced-cron';



gravityPickAndAirMix = function(){
  var availableLetters = Letters.find({$and: [ {'secret_santa':{$exists:false}}, {'status':'unassigned'} ]}).fetch();
  console.log("gravityPickAndAirMix - available letters",availableLetters.length);

  const length = availableLetters.length;
  if (length > 3) {

    for (var i = 0; i < length; i++) {
      if (i === (length-1) ) {

        const firstLetterId = availableLetters[0]._id;
        const secret_santa = {
          id: availableLetters[i].user.id,
          email: availableLetters[i].user.email
        }
        Letters.update({_id:firstLetterId}, {$set:{
            "secret_santa":secret_santa,
            "status": "assigned"
        }});

        const person = {
          name : availableLetters[0].user.firstname
        }

        sendOnAssignmentEmail(secret_santa, person);

      }else {

        const nextLetterId = availableLetters[i+1]._id;
        const secret_santa = {
          id: availableLetters[i].user.id,
          name: availableLetters[i].user.firstname
        }
        Letters.update({_id:nextLetterId}, {$set:{
            "secret_santa":secret_santa,
            "status": "assigned"
        }});

        const person = {
          name : availableLetters[i+1].user.firstname
        }

        sendOnAssignmentEmail(secret_santa, person);

      }
    }

  }else {
    console.log("gravityPickAndAirMix - not enough users");
  }


}
const debug = false;

SyncedCron.add({
    name: 'Gravity Pick And Air Mix',
    schedule: function(parser) {

        if (Meteor.settings.private.testMode) {
          return parser.text('Every 8 min');
        }
          return parser.text(Meteor.settings.private.cronJob.parserText);
    },
    job: function() {
        var gravityPickAndAirMixSchedule = gravityPickAndAirMix();
        return gravityPickAndAirMixSchedule;
    }
});
