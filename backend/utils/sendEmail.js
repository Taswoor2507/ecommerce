import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  //   const transporter = nodemailer.createTransport({
  //     host: "smpt.gmail.com",
  //     port: 465,
  //     service: "Gmail",
  //     auth: {
  //       user: process.env.SMTP_MAIL,
  //       pass: process.env.SMTP_PASSWORD,
  //     },
  //   });
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "adelle.hamill@ethereal.email",
      pass: "p3jT5ZEDQqSz88NPem",
    },
  });

  // const mailOptions = {
  //   from: process.env.SMTP_MAIL,
  //   to: options.email,
  //   subject: options.subject,
  //   text: options.message,
  // };

  const mailOptions = {
    from: "taswoorhossein@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    hmtl: `<a href=${options.message}>link</a>`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default sendEmail;
