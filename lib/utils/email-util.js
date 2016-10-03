/**
 * Created by mattsanders on 10/3/16.
 */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

Meteor.methods({
    'sendEmail'(to,from, subject, text){
        check([to,from,subject,text],[String]);
        this.unblock();
        Email.send({
            to:to,
            from:from,
            subject:subject,
            text:text
        });
    }
});