import { Request, Response } from "express";
import { createContactForm } from "../services/contactService";
import { sendEmail } from "../services/mailer";
import { IContact } from "../interfaces/IContact";

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { first_name, email, message } = req.body as IContact;

    if (!first_name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email, and message are required fields" });
    }

    const contact: IContact = { first_name, email, message };
    await createContactForm(contact);

    await sendEmail(
      "skincarekindearth@gmail.com",
      `New Contact Us Submission from ${first_name}`,
      `Message from ${first_name} (${email}):\n\n${message}`
    );

    res.status(201).json({ message: "Your message was sent successfully!" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
