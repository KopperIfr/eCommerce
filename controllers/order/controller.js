/**
 * Order Controller
 */

const Order = require('../../models/Order.js');

const Controller = {

    getOrders: async (req, res) => {
        const orders = await Order.find({userId: req.session.user._id});
        console.log(orders);
        return orders;
    },
}

module.exports = Controller;