import express from "express";
import multer from "multer";
import path from "path";
import * as productCtrl from "../controllers/productController.js";

const storage = multer.diskStorage({
  destination: "public/",
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage }); // Configure multer with the defined storage

const router = express.Router();

// Create a new product
router.post('/api/products/add', upload.single('image'), productCtrl.createProduct);

// Get all products
router.get('/api/products/getAll', productCtrl.getAllProducts);

// Get a single product by ID
router.get('/api/products/getOne/:productID', productCtrl.getProductById);

// Update a product by ID
router.put('/api/products/update/:productID', upload.single('image'), productCtrl.updateProductById);

// Delete a product by ID
router.delete("/api/products/delete/:productId", productCtrl.deleteProductById);




export { router };



