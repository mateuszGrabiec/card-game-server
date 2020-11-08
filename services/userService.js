const User = require('../models/user');
const moongosee = require('mongoose');
const { result } = require('lodash');

module.exports = {
    createUser: (user)=>{
        // console.log(user);
        const newUser = new User({
            _id: new moongosee.Types.ObjectId(),
            name: user.name,
            password: user.password
        })
        newUser.save().then(result=>{
            console.log(result);
        })
    }
}