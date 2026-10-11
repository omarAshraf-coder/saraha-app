import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "portalrumble123@gmail.com",
      pass: "kculeuffljjodmcw",
    },
  });

  const info = await transporter.sendMail({
    from: '"Saraha App" <portalrumble123@gmail.com>',
    to,
    subject,
    html,
  });

  return info;
};