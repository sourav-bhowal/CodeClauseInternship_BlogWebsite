import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        if (connection) {
            console.log(`MongoDB Connected !!! : ${connection.connection.host}`);
        }
        else{
            console.log("MongoDB connection failed!!!");
            process.exit(1);
        }
    } 
    catch (error) {
        console.log(error.message);
    }
};