/**
 * Created by davidson on 08.10.16.
 */
'use strict';

const dbInstance = require('../app/db'),
    bcrypt = require('bcrypt'),
    async = require('async');


let users = dbInstance.collection('users'),
    cursor = users.find();

function processUser(err, item) {
    if (item == null) {
        process.exit(0);
    }
    async.waterfall([
        (callback) => {
            /*
             rough check for hashed password
             $2a$10$.QlDidnciDBoesUOmSPxPOogrGyLARVmwsM8VyNMrDZD9IusDbBAa
             */
            if (item && item.password && !item.password.startsWith('$2a$10$')) {
                callback(null, item);
            } else {
                callback('Skip item');
            }
        },
        (item, callback) => {
            bcrypt.hash(item.password.trim(), 10, (err, hash) => {
                if (err) {
                    return callback('An error occured while hashing password for user: ' + item.email + ' ' + item.password);
                }
                callback(null, hash);
            });
        },
        (hash, callback) => {
            users.updateById(item._id, {$set: {'password': hash}}, (err, res) => {
                if (err) {
                    return callback('An error occured while updating password for user: ' + item.email + ' ' + password);
                }
                if (res) {
                    callback(null, 'Successfully updated password for user ' + item.email);
                }
            });
        }
    ], (err, res) => {
        console.log(err, res);
        cursor.nextObject(processUser);
    });
}

cursor.nextObject(processUser);
