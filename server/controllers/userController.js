const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("../helpers/bcrypt");
const env = require("dotenv").config();

module.exports = {
    findAll(req, res) {
        User.find({})
            .populate("cart")
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(404).json(err);
            });
    },

    findOne(req, res) {
        User.findById(req.query.id)
            .populate("cart")
            .then(userFound => {
                res.status(200).json(userFound);
            })
            .catch(err => {
                console.log("ERROR!");
                res.status(404).json(err);
            });
    },

    register(req, res) {
        console.log("masok controller function register pak", req.body);
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: "user"
        })
            .then(createdUser => {
                res.status(201).json(createdUser);
            })
            .catch(err => {
                console.log("ERROR!!!!!");
                res.status(404).json({
                    msg: err.message
                });
            });
    },

    login(req, res) {
        console.log(req.body);
        User.findOne({
            email: req.body.email
        })
            .populate("cart")
            .then(userFound => {
                if (!userFound) {
                    throw new Error("email/password wrong.");
                } else {
                    if (bcrypt.compare(req.body.password, userFound.password) === false) {
                        throw new Error("email/password wrong.");
                    } else {
                        let token = jwt.sign({ userFound }, process.env.SECRET_KEY);
                        res.status(200).json({
                            token,
                            userId: userFound._id,
                            role: userFound.role
                        });
                    }
                }
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).json({
                    msg: err.message
                });
            });
    },

    addToCart(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.query.id
            },
            { $push: { cart: req.body.productId } }
        )
            .then(user => {
                res.status(200).json({
                    msg: "product successfully added",
                    data: user
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    deleteProduct(req, res) {
        console.log(req.query.id, "ini user id =======");
        console.log(req.body.productId, "ini product id========");

        User.findOneAndUpdate(
            {
                _id: req.query.id
            },
            {
                $pull: {
                    cart: req.body.productId
                }
            }
        )
            .then(productDeleted => {
                console.log(productDeleted, "product deleted successfully ==========");
                res.status(200).json(productDeleted);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    checkout(req, res) {
        User.findByIdAndUpdate(req.query.id, {
            cart: []
        })
            .then(emptied => {
                console.log("successfully emptied user's cart");
                res.status(200).json(emptied);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};
