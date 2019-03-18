const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cartSchema = new Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
