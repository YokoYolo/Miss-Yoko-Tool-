const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


const itemSchema = new Schema({
  title: String,
  price: {type: Currency},
  quantity: Number,
  totalPrice: {type: Currency, min: 1, max: 2000 },
  image: String,
  type: {type: String, enum: ["Tools", "Gemstones", "Bead Seeds", "Thread"], description: "can only be one of the enum values and is required"},
  description: String,
  shortdescription: String,
  owner:{type: Schema.Types.ObjectId, ref: 'User'},
  color: String,
  dateOfPurchase: Date,
  placeOfPurchase: Date,
  material: String,
  weight: String,
  size: String,
  status: {type: String, enum: ["available", "used"], default: "available"},
},{
  usePushEach: true
},
  {timestamps: true}
);

itemSchema.totalPrice = Currency(itemSchema.quantity*itemSchema.price);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
