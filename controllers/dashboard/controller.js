/**
 * Dashboard Controller
 */

const productController = require('../product/controller.js');
const orderController = require('../order/controller.js');


const Controller = {

    dashboard: async (req, res) => {
        req.from_dashboard = true;
        const products = await productController.getProducts(req, res);
        const orders = await orderController.getOrders(req, res);
        return res.json({
            message: 'Got products and orders for dashboard',
            products,
            orders
        })
    },

}

module.exports = Controller;