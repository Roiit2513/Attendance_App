import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    let uri: string = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
