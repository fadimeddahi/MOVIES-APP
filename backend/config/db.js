import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection SUCCESS");
    }
    catch (error) {
        console.error(error);
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }


};


export default connectDB;