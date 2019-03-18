const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("../helpers/bcrypt");
const env = require('dotenv').config()

module.exports = {
    findAll(req, res) {
        User.find({})
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                res.status(404).json(err);
            });
    },

    register: function(req, res) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
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
        User.findOne({
            username: req.body.username
        })
            .then(userFound => {
                if (!userFound) {
                    throw new Error("username/password wrong.");
                } else {
                    if (bcrypt.compare(req.body.password, userFound.password) === false) {
                        throw new Error("username/password wrong.");
                    } else {
                        let token = jwt.sign({ userFound }, process.env.SECRET_KEY);
                        res.status(200).json({
                            token,
                            userId: userFound._id
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
    }
};
