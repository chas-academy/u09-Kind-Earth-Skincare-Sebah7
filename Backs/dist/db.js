"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectKindEarthDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URL || "";
        await (0, mongoose_1.connect)(mongoURI);
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
exports.default = connectKindEarthDB;
