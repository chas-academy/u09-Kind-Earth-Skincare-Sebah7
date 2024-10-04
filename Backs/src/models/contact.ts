import { model, Schema } from "mongoose";
import { IContact } from "../interfaces/IContact";

const ContactSchema = new Schema<IContact>(
  {
    first_name: { type: String },
    email: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

const Contact = model<IContact>("contact", ContactSchema);

export default Contact;
