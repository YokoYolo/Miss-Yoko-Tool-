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
  status: {type: String, enum: ["open", "close"], default:"open"},
  inventory:  [

    {
      title: String,
      price: {type: Currency},
      quantity: Number,
      usedquantity: Number,
      totalPrice: {type: Currency, min: 1, max: 2000 },
      image: String,
      type: {type: String, enum: ["Tools", "Gemstones", "Bead Seeds", "Thread"], description: "can only be one of the enum values and is required"},
      description: String,
      shortdescription: String,
      // owner:{type: Schema.Types.ObjectId, ref: 'User'},
      color: String,
      dateOfPurchase: Date,
      placeOfPurchase: Date,
      material: String,
      weight: String,
      size: String,
      status: {type: String, enum: ["available", "used"], default: "available"},
    }

  ], 
},
            {
              usePushEach: true
            },
  
  {timestamps: true}
);


const Project = mongoose.model("Project", projectSchema);
module.exports = Project;


// {itemId:  {type: Schema.Types.ObjectId, ref: 'Item'}, usedQuant: Number}
// {type: Item}