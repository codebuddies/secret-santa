import { Letters } from '../../imports/api/letters/letters.js';
import {SyncedCron} from 'meteor/percolate:synced-cron';



gravityPickAndAirMix = function(){
  var availableLetters = Letters.find({$and: [ {'secret_santa':{$exists:false}}, {'status':'unassigned'} ]}).fetch();
  console.log("available letters",availableLetters.length);

  const length = availableLetters.length;
  if (length > 3) {

    for (var i = 0; i < length; i++) {
      if (i === (length-1) ) {

        const firstLetterId = availableLetters[0]._id;
        const secret_santa = {
          id: availableLetters[i].user.id
        }
        Letters.update({_id:firstLetterId}, {$set:{
            "secret_santa":secret_santa,
            "status": "assigned"
        }});


      }else {

        const nextLetterId = availableLetters[i+1]._id;
        const secret_santa = {
          id: availableLetters[i].user.id
        }
        Letters.update({_id:nextLetterId}, {$set:{
            "secret_santa":secret_santa,
            "status": "assigned"
        }});


      }
    }

  }


}
const debug = false;

SyncedCron.add({
    name: 'Gravity Pick And Air Mix',
    schedule: function(parser) {

        if (Meteor.settings.private.testMode) {
          return parser.text('Every 10 min');
        }
          return parser.text(Meteor.settings.private.cronJob.parserText);
    },
    job: function() {
        var gravityPickAndAirMixSchedule = gravityPickAndAirMix();
        return gravityPickAndAirMixSchedule;
    }
});
