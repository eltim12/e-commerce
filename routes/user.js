const router = require("express").Router();
const userController = require("../controllers/userController");

// ──[get all users data]─────────────────────
router.get("/", userController.findAll);

// ──[get all users data]─────────────────────
router.post("/register", userController.register)

// ──[user login]─────────────────────
router.post("/login", userController.login)
module.exports = router;
