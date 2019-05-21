const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    lastname: String,
    email: String,
    image: String,
    inventory: {type: Schema.Types.ObjectId, ref: 'Item'},
    projects: {type: Schema.Types.ObjectId, ref: 'Project'},
    },
    {
        usePushEach: true
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;