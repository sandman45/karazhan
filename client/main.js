import { Template } from 'meteor/templating';

import { Tasks } from '/lib/collections/tasks.js';
import { Users } from '/lib/collections/tasks.js';
import './main.html';

Template.body.helpers({
    tasks(){
        return Tasks.find({});
    },
    users(){
        return Users.find({});
    }
});

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
        });

        // Clear form
        target.text.value = '';
    }
});

Router.route('/', function () {});