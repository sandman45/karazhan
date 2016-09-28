/**
 * Created by mattsanders on 9/28/16.
 */
import { Tasks } from '/lib/collections/tasks.js';
import { Users } from '/lib/collections/tasks.js';

Template.taskList.helpers({
    tasks(){
       return Tasks.find({},{sort:{createdAt:-1}});
    },
    users(){
       return Users.find({id:'123'}).fetch();
    }
});