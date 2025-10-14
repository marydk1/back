const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  title:String,
  description:String,
  price:Number,
  image:String,
  promotion: {type:Boolean, default:false},
  discountPercent: {type:Number, default:0}
});
module.exports = mongoose.model('Product', ProductSchema);
