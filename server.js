const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // إعداد الناقل
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  // محتوى الرسالة
  let mailOptions = {
    from: email,
    to: process.env.TO_EMAIL,
    subject: `رسالة جديدة من ${name}`,
    text: message,
  };

  // إرسال الرسالة
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'تم إرسال الرسالة بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء الإرسال', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
