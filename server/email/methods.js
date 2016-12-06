sendWelcomeEmail = function (user) {

  SSR.compileTemplate('welcome', Assets.getText('welcome.html'));

  const template_data = {
    user: {
      name : user.firstname
    }
  };

  const data = {
    to: user.email,
    from: Meteor.settings.private.email.from,
    html: SSR.render('welcome', template_data),
    subject: "Welcome! (and some Secret Santa reminders)",
  }

  try {
   Email.send(data);
  } catch ( e ) {
    return false;
  } finally {
    return true;
  }
}



sendOnAssignmentEmail = function (santa, person) {

  SSR.compileTemplate('assignedToPerson', Assets.getText('assignment.html'));

  const template_data = {
    person: {
      name : person.name
    }
  };

  const data = {
    to: santa.email,
    from: Meteor.settings.private.email.from,
    html: SSR.render('assignedToPerson', template_data),
    subject: "Re: You’ve been assigned a Secret Santa match!",
  }

  try {
   Email.send(data);
  } catch ( e ) {
    return false;
  } finally {
    return true;
  }

}


giftSentEmailToSender = function (santa, person) {

  SSR.compileTemplate('giftSentToSender', Assets.getText('gift_sent_to_sender.html'));

  const template_data = {
    person: {
      name : person.name
    }
  };

  const data = {
    to: santa.email,
    from: Meteor.settings.private.email.from,
    html: SSR.render('giftSentToSender', template_data),
    subject: "Your gift has been sent!",
  }

  try {
   Email.send(data);
  } catch ( e ) {
    return false;
  } finally {
    return true;
  }


}

giftSentEmailToReceiver = function (person) {

  SSR.compileTemplate('giftSentToReceiver', Assets.getText('gift_sent_to_receiver.html'));

  const template_data = {
    person: {
      name : person.name,
      gift: Meteor.absoluteUrl('my-gift')
    }
  };

  const data = {
    to: person.email,
    from: Meteor.settings.private.email.from,
    html: SSR.render('giftSentToReceiver', template_data),
    subject: "Please confirm that your Secret Santa has emailed you a gift!",
  }

  try {
   Email.send(data);
  } catch ( e ) {
    return false;
  } finally {
    return true;
  }


}

giftReceivedEmailToSender = function (santa, person) {

  SSR.compileTemplate('giftReceivedToSender', Assets.getText('gift_received_to_sender.html'));

  const template_data = {
    person: {
      name : person.name
    }
  };

  const data = {
    to: santa.email,
    from: Meteor.settings.private.email.from,
    html: SSR.render('giftReceivedToSender', template_data),
    subject: "Your recipient has received your Secret Santa gift!",
  }

  try {
   Email.send(data);
  } catch ( e ) {
    return false;
  } finally {
    return true;
  }


}

giftReceivedEmailToReceiver = function (person) {

  SSR.compileTemplate('giftReceivedToReceiver', Assets.getText('gift_received_to_receiver.html'));
  const data = {
    to: person.email,
    from: Meteor.settings.private.email.from,
    html: SSR.render('giftReceivedToReceiver'),
    subject: "Thank you for participating in Secret Santa!",
  }

  try {
   Email.send(data);
  } catch ( e ) {
    return false;
  } finally {
    return true;
  }


}
