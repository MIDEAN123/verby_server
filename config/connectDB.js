import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to DB:", error.message);
    process.exit(1); // 1 = failure, 0 = success
  }
};

export default connectDB;