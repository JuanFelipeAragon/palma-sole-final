import Product from "../models/productModel.js";

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, subcategory } = req.body;

    const imageUrl = `http://localhost:8000/images/${req.file.filename}`; // Assuming the file is saved with a unique filename

    const createdProduct = await Product.create({
      name,
      price,
      description,
      category,
      subcategory,
      image: imageUrl, // Save the image URL in the database
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors from MongoDB
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ message: 'Validation error', errors });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};


// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.productID;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product by ID
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.productID;

    // Assuming 'image' is the field name for the image in your database
    const imageUrl = `http://localhost:8000/images/${req.file.filename}`;
    req.body.image = imageUrl;

    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productID;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
