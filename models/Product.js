const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [16, 'Description should contains at least 16 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required!']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

ProductSchema.methods.checkQuantity = function(quantity) {
    return this.quantity >= quantity;
}

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;