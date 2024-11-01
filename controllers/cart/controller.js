/**
 * Cart Controller
 */

const Controller = {


    addProduct: (req, res) => {
        console.log('Adding a product to shopping cart..');
        let cart = req.cookies.shoppingCart ? JSON.parse(req.cookies.shoppingCart) : []
        const { product } = req.body;
        cart.push(product);
        res.cookie('shoppingCart', JSON.stringify(cart), {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        console.log('Product added to shopping cart');
        console.log(req.cookies.shoppingCart);
        return res.json({
            message: 'Product added to shopping cart',
            product
        })
    },

    removeProduct: (req, res) => {
        let cart = req.cookies.shoppingCart ? JSON.parse(req.cookies.shoppingCart) : []
        const { id } = req.params;
        const newCart = cart.filter((item) => item.id !== id);
        res.cookie('shoppingCart', JSON.stringify(newCart), {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({
            message: 'Product from shoppipng cart deleted!'
        })
    },

    emptyCart: (req, res) => {
        if(req.from_product) {
            return res.clearCookie('shoppingCart');
        }
        res.clearCookie('shoppingCart');
        res.json({
            message: 'Shopping cart emptied',
        })
    },

    getCart: (req, res) => {
        try {
            let cart = req.cookies.shoppingCart ? JSON.parse(req.cookies.shoppingCart) : [];
            console.log(cart);
            return res.json({
                cart
            })
        } catch (error) {
            console.log(error);
            res.json({
                error: error
            })
        }
    }
}

module.exports = Controller;