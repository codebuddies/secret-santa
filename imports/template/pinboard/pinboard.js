import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { Letters } from '../../api/letters/letters.js';

import './pinboard.html';



Template.pinboard.onCreated(function() {
   let instance = this;
   instance.limit = new ReactiveVar(54);
   instance.flag = new ReactiveVar(false);
   instance.itemFilter = new ReactiveVar('santa');

   instance.autorun(function () {
     let limit = instance.limit.get();
     let itemFilter = instance.itemFilter.get()
     instance.subscribe('pinboard', limit, itemFilter);
   });

   instance.loadItems = function() {
     return Letters.find({});
   }

});

Template.pinboard.onRendered(function() {
    let instance = this;


    instance.scrollHandler = function(){

      if  ($(window).scrollTop() > ($(document).height() - $(window).height()) -20 && !instance.flag.get()){

        if(Letters.find().count() === instance.limit.get()){
             instance.limit.set(instance.limit.get() + 9);
             $('body').addClass('stop-scrolling');
        }else{
           if(Letters.find().count() < instance.limit.get()){
               instance.flag.set(true);
           }else {

           }
        }

      }


    }.bind(instance);
    $(window).on("scroll" ,instance.scrollHandler);

});


Template.pinboard.helpers({
  items:function(){
    return Template.instance().loadItems();
  },
  status:function(){
    return  Template.instance().flag.get();
  }
});

Template.pinboard.events({
  "change #itemType": function(event, template){

      itemFilter = template.find("input:radio[name=itemType]:checked").value;
      template.flag.set(false);
      template.itemFilter.set(itemFilter);
  }
});


Template.pinboard.onDestroyed(function(){
    $(window).off("scroll", this.scrollHandler);
});
