const router = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")

// ──[get all users data]─────────────────────
router.get("/", userController.findAll);

// ──[get one users data]─────────────────────
router.get("/find", userController.findOne);

// ──[user register]─────────────────────
router.post("/register", userController.register)

// ──[user login]─────────────────────
router.post("/login", userController.login)

// ──[add product to user's cart]─────────────────────
router.post("/addToCart", authentication, userController.addToCart)

// ──[delete product from user's cart]─────────────────────
router.put("/deleteFromCart", authentication,  userController.deleteProduct)

// ──[empty all products from user's cart]─────────────────────
router.delete("/checkout",  authentication, userController.checkout)


module.exports = router;