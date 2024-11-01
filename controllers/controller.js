/**
 * Default Controller
 */

const productController = require('./product/controller.js');

const Controller = {

    homepage: async (req, res) => {
        req.from_home = true;
        const products = await productController.getProducts(req, res);
        return res.json({
            message: 'Got products for homepage',
            products
        })
    },
}

module.exports = Controller;