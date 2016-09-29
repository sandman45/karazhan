/**
 * Created by mattsanders on 9/29/16.
 */

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
   passwordSignupFields:'USERNAME_ONLY'
});