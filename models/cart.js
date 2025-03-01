const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Userauth",
  },
  quantity: {
    type: Number,
  },
  status:{
    type:Boolean,
    default:true,
}
},{
  timeStamps:true,
});

const cart = mongoose.model("Cart", CartSchema);
module.exports = cart;
