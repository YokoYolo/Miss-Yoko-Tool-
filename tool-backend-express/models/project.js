const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const projectSchema = new Schema({
  name: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  // projectpPrice: {type: Currency, min: 1},
  image: String,
  description: String,
  shortdescription: String,
  owner:{type: Schema.Types.ObjectId, ref: 'User'},
  // status: {type: String, enum: ["open", "close"], default:"open"},
  inventory:  [ {itemId:  {type: Schema.Types.ObjectId, ref: 'Item'}, usedQuant: Number}
              ], 
            },
            {
              usePushEach: true
            },
  
  {timestamps: true}
);


const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
