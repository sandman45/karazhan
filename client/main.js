import { Template } from 'meteor/templating';
import { Tasks } from '/lib/collections/tasks.js';
import { Info } from '/lib/collections/information-api';
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
        Meteor.call('tasks.insert',text);

        // Clear form
        target.text.value = '';
    },
    'click .getInfo'(event){
        event.preventDefault();
        const id = '1';
        Meteor.call('checkTwitter',id);
    },
    'click .sendEmail'(event){
        event.preventDefault();
        Meteor.call('sendEmail','msanders45@gmail.com','msanders@silvervue.com','test email','hey this is a test email');
    }
});

Router.route('/', function () {
    this.next();
});