const Product = require("../models/product");

module.exports = {
    allProduct(req, res) {
        Product.find({})
            .then(allProduct => {
                res.status(200).json(allProduct);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    addProduct(req, res) {
        Product.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            photo: req.file.cloudStoragePublicUrl
        })
            .then(productCreated => {
                res.status(201).json(productCreated);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    findProduct(req, res) {
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
        let updateObj = {};
        
        if (req.file) {
            updateObj = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                photo: req.file.cloudStoragePublicUrl
            };
        } else {
            updateObj = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock
            };
        }

        Product.findByIdAndUpdate(req.query.id, updateObj)
            .then(updatedProduct => {
                res.status(200).json(updatedProduct);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    deleteProduct(req, res) {
        Product.findByIdAndDelete(req.query.id)
            .then(productDeleted => {
                res.status(200).json(productDeleted);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
};
