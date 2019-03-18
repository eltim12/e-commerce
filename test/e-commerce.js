const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect();
const should = chai.should();
const mongoose = require("mongoose");
const colors = require("colors");

const app = require("../app");

chai.use(chaiHttp);

after(function(done) {
    mongoose.connect("mongodb://localhost:27017/e-commerce-development", { useNewUrlParser: true }, function() {
        mongoose.connection.db.dropDatabase();
        done();
    });
});

let userId = 0;
let productId = 0;
let cartId = 0
let userToken = 0



describe("Testing For Users".blue.bold, () => {
    describe("Getting all users data", () => {
        it("Make sure its an array and have status code of 200", function(done) {
            chai.request(app)
                .get("/users")
                .then(res => {
                    res.body.should.be.an("array");
                    res.status.should.equal(200);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe("Testing User Register", function(done) {
        it("Check if User can register successfully", function(done) {
            let newUserData = {
                username: "eltim",
                email: "eltim@mail.com",
                password: "eltim"
            };
            chai.request(app)
                .post("/users/register")
                .send(newUserData)
                .then(res => {
                    res.status.should.equal(201);
                    res.body.username.should.equal(newUserData.username);
                    res.body.email.should.equal(newUserData.email);
                    userId = res.body._id;
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe("Testing User Login", function(done) {
        it("Check if User can login successfully", function(done) {
            let userLoginData = {
                username: "eltim",
                password: "eltim"
            };
            chai.request(app)
                .post("/users/login")
                .send(userLoginData)
                .then(res => {
                    // console.log(res.body)
                    userToken = res.body.token
                    res.status.should.equal(200);
                    res.body.userId.should.equal(userId);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});


describe("Testing For Products".blue.bold, () => {
    describe("Creating product", () => {
        it("Make sure new product is successfully added", function(done) {
            let productInput = {
                name: "test",
                price: 100
            };
            chai.request(app)
                .post("/products")
                .send(productInput)
                .then(res => {
                    res.body.name.should.equal(productInput.name);
                    res.body.price.should.equal(productInput.price);
                    res.body.should.be.an("object");
                    productId = res.body._id;
                    res.status.should.equal(201);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe("Reading Product", () => {
        it("Make sure a product is exist in database", function(done) {
            chai.request(app)
                .get(`/products/find?id=${productId}`)
                .then(res => {
                    res.status.should.equal(200);
                    res.body._id.should.equal(productId);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe("Updating Product", () => {
        it("Make sure a product can be updated successfully", function(done) {
            let updateProduct = {
                name: "test2"
            };
            chai.request(app)
                .put(`/products?id=${productId}`)
                .send(updateProduct)
                .then(productUpdated => {
                    productUpdated.status.should.equal(200);
                    productUpdated.body._id.should.equal(productId)
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
    describe("Deleting Product", () => {
        it("Make sure a product can be deleted successfully", function(done) {
            chai.request(app)
                .delete(`/products?id=${productId}`)
                .then(deletedProduct => {
                    deletedProduct.status.should.equal(200);
                    deletedProduct.body._id.should.equal(productId);
                    done();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    });
});

describe("Testing For Carts".blue.bold, () => {
    describe("Creating a Cart", () => {
        it("Make sure a cart can be created successfully", function(done) {
            chai.request(app)
            .post("/carts")
            .send({ 
                productId: productId,
                userId: userId
            })
            .set("token", userToken)
            .then(res => {
                cartId = res.body._id
                res.body.userId.should.equal(userId)
                res.body.productId.should.equal(productId)     
                res.status.should.equal(201)
                done()
            })
            .catch(err => {
                console.log(err)
            })
        });
    });
    describe("Deleting a Cart", () => {
        it("Make sure a cart can be deleted successfully", function(done) {
            chai.request(app)
            .delete(`/carts?id=${cartId}`)
            .set("token", userToken)
            .then(res => {
                res.body._id.should.equal(cartId)
                res.status.should.equal(200)
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
});
