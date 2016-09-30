/**
 * Created by mattsanders on 9/27/16.
 */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

//TODO: upgrade to couch 2.0 on server 162.243.203.80
//comment out this for ios to work if we dont have couch upgraded on that server
export const Users = new CouchDB.Database('my_users');

if(Meteor.isServer){
    Meteor.publish('tasks', function tasksPublication(){
       return Tasks.find({
           $or:[
               {private:{$ne:true}},
               {owner: this.userId}
           ]
       });
    });

    // This code only runs on the server
    Meteor.publish("users", function () {
        return Users.find();
    });
}

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

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId,setChecked){
        check(taskId, String);
        check(setChecked,Boolean);

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId,{$set:{checked:setChecked}});
    },
    'tasks.setPrivate'(taskId,setToPrivate){
        check(taskId,String);
        check(setToPrivate,Boolean);

        const task = Tasks.findOne(taskId);
        if(task.owner !== this.userId){
            throw  new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, {$set: {private: setToPrivate}});
    }
});





