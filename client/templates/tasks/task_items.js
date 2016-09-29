/**
 * Created by mattsanders on 9/27/16.
 */

Template.taskItem.events({
    'click .toggle-checked'(){
        Meteor.call('tasks.setChecked', this._id, !this.checked);
    },
    'click .delete'(){
        Meteor.call('tasks.remove',this._id);
    }
});