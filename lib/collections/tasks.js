/**
 * Created by mattsanders on 9/27/16.
 */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
   'tasks.insert'(text){
       check(text,String);

       if(!this.userId){
           throw new Meteor.Error('not-authorized');
       }
       Tasks.insert({
           text,
           createdAt:new Date(),
           owner: this.userId,
           username:Meteor.users.findOne(this.userId).username
       });
   },
    'tasks.remove'(taskId){
        check(taskId,String);

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId,setChecked){
        check(taskId, String);
        check(setChecked,Boolean);
        Tasks.update(taskId,{$set:{checked:setChecked}});
    }
});



//TODO: upgrade to couch 2.0 on server 162.243.203.80
//comment out this for ios to work if we dont have couch upgraded on that server
export const Users = new CouchDB.Database('my_users');

