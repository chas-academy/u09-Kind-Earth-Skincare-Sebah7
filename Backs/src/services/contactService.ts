import Contact from "../models/contact";
import { IContact } from "../interfaces/IContact";

const createContactForm = async (data: IContact) => {
  return await Contact.create(data);
};

export { createContactForm };
