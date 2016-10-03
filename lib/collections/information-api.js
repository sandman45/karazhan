/**
 * Created by mattsanders on 10/3/16.
 */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

Meteor.methods({'checkTwitter'(userId){
    check(userId,String);
    this.unblock();
    try{
        var params = {params:{user:userId}};
        var result = HTTP.call('GET', '',params);
        console.log(result);
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}});