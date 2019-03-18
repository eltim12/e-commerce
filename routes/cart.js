const router = require("express").Router();
const cartController = require("../controllers/cartController");
const authorization = require("../middlewares/authentication")

router.use('/', authorization);

// ──[create new cart]─────────────────────
router.post("/", cartController.create);

// ──[delete a cart]─────────────────────
router.delete("/", cartController.delete)


module.exports = router;