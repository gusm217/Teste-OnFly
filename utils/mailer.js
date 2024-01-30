const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MEU_EMAIL,
    pass: process.env.MINHA_SENHA
  }
});

const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};

module.exports = sendEmail;
