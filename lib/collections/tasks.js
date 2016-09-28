/**
 * Created by mattsanders on 9/27/16.
 */
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

//TODO: upgrade to couch 2.0 on server 162.243.203.80
//comment out this for ios to work if we dont have couch upgraded on that server
export const Users = new CouchDB.Database('my_users');

