import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"], // Error message if name is missing
      trim: true, // Remove whitespace from the beginning and end of the string
    },
    last_name: {
      type: String,
      required: [true, "last name is required"], // Error message if name is missing
      trim: true, // Remove whitespace from the beginning and end of the string
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true, // Convert email to lowercase
      validate: {
        validator: function (value) {
          // Custom validation for email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format", // Error message if email format is invalid
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"], // Minimum password length
      // Additional validations like complexity requirements can be added here
    },
  },
  {
    timestamps: true,
  }
);


// Uncomment this section to hash the password before saving to the database
UserSchema.pre("save", function(next) {
    // Hash the password using bcrypt (ensure bcrypt is installed and imported)
    this.password = bcrypt.hashSync(this.password, 10); // Hashing the password with salt factor 10
    next();
});


const User = mongoose.model("users", UserSchema);

export default User;
