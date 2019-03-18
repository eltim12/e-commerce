const router = require("express").Router();
const productController = require("../controllers/productController");

// ──[create new product]─────────────────────
router.post("/", productController.addProduct);


// ──[find  product by id]─────────────────────
router.get("/find", productController.findProduct);

// ──[update a product]─────────────────────
router.put("/", productController.updateProduct)

// ──[delete a product]─────────────────────
router.delete("/", productController.deleteProduct)


module.exports = router;
