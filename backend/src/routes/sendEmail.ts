import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/', async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email', details: err });
  }
});

export default router;
