/**
 * Created by mattsanders on 9/30/16.
 */
import { Meteor } from 'meteor/meteor';

import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Tasks } from '/lib/collections/tasks.js';

if(Meteor.isServer){
    describe('Task',()=>{
        describe('methods.tasks.remove',()=>{
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    checked:true,
                    private:true,
                    username: 'tmeasday'
                });
            });

            it('can delete owned task',()=>{
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];

                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };

                // Run the method with `this` set to the fake invocation
                deleteTask.apply(invocation, [taskId]);

                // Verify that the method does what we expected
                assert.equal(Tasks.find().count(), 0);
            });

        });
        describe('methods.tasks.setChecked',()=>{
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    checked:false,
                    username: 'tmeasday'
                });
                console.log(taskId);
                Tasks.update(taskId,{$set:{checked:true}});
            });

            it('set checked task',()=>{
                const setCheckedTask = Meteor.server.method_handlers['tasks.setChecked'];
                const invocation = {userId};
                const setChecked = true;

                setCheckedTask.apply(invocation, [taskId,setChecked]);

                var cursor = Tasks.find({_id:{$eq:taskId}});
                var val = cursor.fetch();
                assert.equal(val[0].checked,true);
            });

        });
    });
}