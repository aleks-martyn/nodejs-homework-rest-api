import nodemailer from "nodemailer";

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "oleksandr.martyniuk@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "oleksandr.martyniuk@meta.ua" };
  await transport.sendMail(email);
  return true;
};

export default sendEmail;
