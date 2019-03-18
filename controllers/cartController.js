const Cart = require('../models/cart')

module.exports = {
    
    create(req, res) {
        Cart.create({
            productId: req.body.productId,
            userId: req.body.userId
        })
        .then(newCart => {
            res.status(201).json(newCart)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },

    delete(req, res) {
        Cart
            .findByIdAndDelete(req.query.id)
            .then(cartDeleted => {
                res.status(200).json(cartDeleted)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
};
