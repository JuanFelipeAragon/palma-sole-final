import mongoose from 'mongoose';

// Establish a connection to the MongoDB database
export const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/palmasole");
        console.log("Connection successful");
    } catch (error) {
        console.error("Connection error:", error);
    }
};
