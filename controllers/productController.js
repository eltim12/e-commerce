const Product = require("../models/product");

module.exports = {
    addProduct(req, res) {
        Product.create({
            name: req.body.name,
            price: req.body.price
        })
            .then(productCreated => {
                res.status(201).json(productCreated);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    findProduct(req, res) {
        // console.log(typeof req.query.id,'from controller ==========')
        Product.findById(req.query.id)
            .then(foundProduct => {
                // console.log(foundProduct)
                res.status(200).json(foundProduct);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    updateProduct(req, res) {
        Product
            .findByIdAndUpdate(req.query.id, req.body)
            .then(updatedProduct => {
                res.status(200).json(updatedProduct)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    deleteProduct(req,res) {
        Product 
            .findByIdAndDelete(req.query.id)
            .then(productDeleted => {
                res.status(200).json(productDeleted)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
};
