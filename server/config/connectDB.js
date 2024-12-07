import mongoose from "mongoose";
import  dotenv from "dotenv";
dotenv.config()

if (!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI file in .env file"
    )
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected DB")
    } catch (error){
        console.log("MongoDB connect error", error)
        process.exit(1)
    }
}

export default connectDB