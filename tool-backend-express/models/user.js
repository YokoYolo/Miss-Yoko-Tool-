const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String,  required: true, unique: true},
    password: { type: String,  required: true, unique: true},
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