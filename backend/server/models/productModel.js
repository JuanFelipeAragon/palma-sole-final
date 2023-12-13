import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name should be at least 3 characters long"],
      maxlength: [50, "Product name cannot exceed 50 characters"],
    },
   
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [10, "Description should be at least 10 characters long"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: ["Swimwear", "Sets", "Clothes/Accesories"],
        message: "Category should be one of: swimwear, sets, clothes and Accesories",
      },
      trim: true,
    },
    subcategory: {
      type: String,
      required: [true, "Product subcategory is required"],
      enum: {
        values: ["One Piece", "Two Piece", "Crochet"],
        message: "Subcategory should be one of: onePiece, twoPiece, crochet",
      },
      trim: true,
    },
    
    image: {
      type: String, // Store image URL as a string
      required: [true, "Image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true }, // Enable virtuals to be included in JSON output
    toObject: { getters: true }, // Enable virtuals to be included in object output
  }
);

const Product = mongoose.model("products", productSchema);

export default Product;

