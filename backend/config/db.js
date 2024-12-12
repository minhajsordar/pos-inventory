import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  try {
    console.log(`mongodb string: ${process.env.MONGODB_URL}`);
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    console.error(`Error: ${error.message} mongo string`);
    process.exit(1);
  }
};
export default connectDB;
