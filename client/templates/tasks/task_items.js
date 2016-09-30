/**
 * Created by mattsanders on 9/27/16.
 */

Template.taskItem.helpers({
    isOwner(){
        return this.owner === Meteor.userId();
    }
});


Template.taskItem.events({
    'click .toggle-checked'(){
        Meteor.call('tasks.setChecked', this._id, !this.checked);
    },
    'click .delete'(){
        Meteor.call('tasks.remove',this._id);
    },
    'click .toggle-private'(){
        Meteor.call('tasks.setPrivate', this._id, !this.private);
    }
});