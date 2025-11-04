import nodemailer from 'nodemailer';
import { SMTP } from '../constants/constants.js';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

console.log('transporter: ', transporter);

export const sendEmail = async (mailOptions) => {
  console.log('Attempting to send email with mailOptions: ', mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email successfully sent! Message ID: ', info.messageId);
    // Bu log Render loglarında görünmelidir. Görünmüyorsa TAKILMIŞ demektir.
    return info;
  } catch (error) {
    // BURADA YAKALANAN HATA, Render'daki sorun hakkındaki tek ipucunuzdur.
    console.error('❌ Nodemailer Error: Email could not be sent.');
    console.error('Error details:', error);

    // Hatayı tekrar fırlatıyoruz ki, çağrı yapan fonksiyonda (requestResetToken) yakalanabilsin.
    // requestResetToken bu hatayı yakaladığında 500 hatasına düşecektir.
    throw error;
  }
};
