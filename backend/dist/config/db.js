"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const connectionUrl = process.env.CONNECTION_URL;
        if (!connectionUrl)
            throw new Error("CONNECTION_URL not defined");
        const conn = await mongoose_1.default.connect(connectionUrl, {
            tls: true,
            tlsAllowInvalidCertificates: true,
            retryWrites: true,
            w: "majority",
        });
        console.log("MongoDB Connected Successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map