import nodemailer from "nodemailer";

const { META_PASSWORD, META_EMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL_FROM,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: META_EMAIL_FROM };
  await transport.sendMail(email);
  return true;
};

export default sendEmail;
