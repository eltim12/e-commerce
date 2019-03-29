const router = require("express").Router();
const productController = require("../controllers/productController");
const images = require("../helpers/images");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")

// ──[create new product]─────────────────────
router.post("/", authentication, authorization, images.multer.single("image"), images.sendUploadToGCS, productController.addProduct);

// ──[find  all product]─────────────────────
router.get("/", productController.allProduct);

// ──[find  product by id]─────────────────────
router.get("/find", productController.findProduct);

// ──[update a product]─────────────────────
router.put("/", authentication, authorization, images.multer.single("image"), images.sendUploadToGCS, productController.updateProduct);

// ──[delete a product]─────────────────────
router.delete("/", authentication, authorization, productController.deleteProduct);

module.exports = router;
