//packages
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


//all the template
import '../../template';


FlowRouter.notFound = {

    action: function() {
      BlazeLayout.render('layout', { main: 'notFound' });
    }
};



FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('layout', { main: 'landing' });
  },
});
