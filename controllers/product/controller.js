/**
 * 
 * Products Controller
 * 
 */

const Product = require('../../models/Product.js');
const Order = require('../../models/Order.js');
const cartController = require('../cart/controller.js');

const Controller = {

    getProducts: async (req, res) => {
        if(req.from_home) {
            const products = await Product.find();
            return products;
        } else if(req.from_dashboard){
            const products = await Product.find({userId: req.session.user._id});
            return products;
        } else {
            const products = await Product.find({userId: req.session.user._id});
            return res.json({
                message: 'Products..',
                products
            })
        }
    },
    
    getProduct: async (req, res) => {

        const {id} = req.params;

        try {
            const product = await Product.findById(id);

        } catch (error) {



        }
    },

    addProduct: async (req, res) => {

        const { name, description, price, quantity } = req.body;
        try {
            const product = await Product.create({
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                userId: req.session.user._id
            });

            await product.populate('userId');

            return res.status(200).json({
                message: 'Product added',
                product
            });

        } catch (error) {

            if(error.name === "ValidationError") {
                const errorMessages = Object.values(error.errors).map(err => err.message);
                return res.json({
                    message: 'Validation Errors!',
                    errors: errorMessages
                })
            } 

            console.log(error);
            return res.status(500).json({
                error
            })
        }
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const fields = req.body;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, {"$set": fields}, {new: true, runValidators: true});

            if(!updatedProduct) {
                return res.status(404).json({
                    message: 'Product not found!'
                })
            }

            return res.status(200).json({
                message: 'Product updated!',
                product: updatedProduct
            })

        } catch (error) {

            return res.status(500).json({
                message: 'Error updating product',
                error: error.message || 'Unknown error'
            });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            await Product.findByIdAndDelete(id);
            return res.status(200).json({
                message: 'Product deleted!'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal error when deleting product',
                error
            })
        }
    },

    buyProducts: async (req, res) => {
        const cart  = req.cookies.shoppingCart ? JSON.parse(req.cookies.shoppingCart) : [];
        if(cart.length === 0) {
            return res.json({
                message: 'Cart is empty!'
            })
        }

        const user = req.session.user;
        let totalPrice = 0;

        try {
            
            for(item of cart){

                const product = await Product.findById(item.id);

                if (!product) {
                    return res.status(404).json({ message: `Product with ID ${item.id} not found` });
                }

                if(!product.checkQuantity(item.quantity)) {
                    return res.status(400).json({
                        message: `Not enough quantity for product: ${product.name}`,
                        availableQuantity: product.quantity,
                    });
                }

                totalPrice += item.price * item.quantity;
                console.log(totalPrice);
                product.quantity -= item.quantity;
                await product.save();
            }

            console.log(totalPrice);
            const order = await Order.create({
                userId: user._id,
                products: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                })),
                totalPrice
            });
            
            req.from_product = true;
            cartController.emptyCart(req, res);

            return res.status(200).json({message: 'Products purchased!', order});

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error when buying products', error: error.message });
        }
    }
}

module.exports = Controller;