import { Template } from 'meteor/templating';
import { Tasks } from '/lib/collections/tasks.js';
import './accounts/accounts-config.js';
import './main.html';

Template.body.helpers({
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
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
            checked:false,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            createdAt: new Date()
        });

        // Clear form
        target.text.value = '';
    }
});

Router.route('/', function () {
    this.next();
});