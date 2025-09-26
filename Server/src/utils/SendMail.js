import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const SendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};

export const mailGenerator = new Mailgen({
  theme: "salted",
  product: {
    name: "Prepify",
    link: "https://localhost:8000",
    logo: "https://img.freepik.com/free-vector/gradient-p-letter-logo-template_52683-84721.jpg?semt=ais_hybrid&w=740&q=80",
  },
});

export default SendMail;
