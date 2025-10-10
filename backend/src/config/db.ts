import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const connectionUrl = process.env.CONNECTION_URL;
    if (!connectionUrl) throw new Error("CONNECTION_URL not defined");

    const conn = await mongoose.connect(connectionUrl, {
      tls: true,
      tlsAllowInvalidCertificates: true, // For development - allows self-signed certificates
      retryWrites: true,
      w: "majority",
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
