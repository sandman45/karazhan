/**
 * Created by mattsanders on 9/28/16.
 */
import { Tasks } from '/lib/collections/tasks.js';
import { Users } from '/lib/collections/tasks.js';
import { ReactiveDict } from 'meteor/reactive-dict';

Template.taskList.onCreated(function onCreated(){
    this.state = new ReactiveDict();
    Meteor.subscribe('tasks');
    Meteor.subscribe('users');
});

Template.taskList.events({
    'change .hide-completed input'(event,instance){
        instance.state.set('hideCompleted', event.target.checked);
    }
});

Template.taskList.helpers({
    tasks(){
        const instance = Template.instance();
        if(instance.state.get('hideCompleted')){
            return Tasks.find({checked:{$ne:true}},{sort:{createdAt:-1}});
        }
        return Tasks.find({},{sort:{createdAt:-1}});
    },
    users(){
        return Users.find({id:'123'}).fetch();
    }
});