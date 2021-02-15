const moongosee = require('mongoose');

const userSchema = moongosee.Schema({
    _id: moongosee.Types.ObjectId,
    name: String,
    email: String,
    password: String
})

module.exports = moongosee.model('User',userSchema);