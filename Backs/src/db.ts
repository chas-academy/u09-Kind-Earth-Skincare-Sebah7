import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectKindEarthDB = async () => {
  try { 
    const mongoURI: string = process.env.MONGO_URL || "";
    await connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (err: any) {
    console.error(err.message);

    process.exit(1);
  }
};

export default connectKindEarthDB;