const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  productId: {
    type: Array,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartId: {
    type: Array,
    ref: "Cart",
    required: true,
  },
  status:{
    type:Boolean,
    default:true,
}
},{
  timeStamps:true,
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
