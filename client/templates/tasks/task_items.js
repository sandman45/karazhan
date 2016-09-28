/**
 * Created by mattsanders on 9/27/16.
 */
import { Tasks } from '/lib/collections/tasks.js';

Template.taskItem.events({
    'click .toggle-checked'(){
        Tasks.update(this._id,{
            $set:{checked: ! this.checked }
        });
    },
    'click .delete'(){
        Tasks.remove(this._id);
    }
});