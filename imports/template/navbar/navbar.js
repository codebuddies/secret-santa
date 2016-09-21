import {Modal} from 'meteor/peppelg:bootstrap-3-modal';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';


import './navbar.html';



Template.navbar.events({
  "click #logout": function(event, template){
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('landing');
  },
});
