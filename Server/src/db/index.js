import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";



const connectDB = async () => {
    // console.log(process.env.MONGODB_URI)
    // console.log(DB_NAME)
    try {
        const connection = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        )
        console.log(`\n Mongo connected !! DB HOST: ${connection.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1)
    }
}

export default connectDB;