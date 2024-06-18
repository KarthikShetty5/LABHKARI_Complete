import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface SendMailRequest extends NextApiRequest {
    body: {
        to: string;
        subject: string;
        url: string;
        status: string;
    };
}

const sendMail = async (req: SendMailRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { to, subject, url, status } = req.body;

        try {
            const htmlContent = `<!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Your order Confirmed</title>
      </head>
      <body>
          <h1>Track your order now</h1>
          <p></p> 
          <br/><br/>
          <div>Current_Status : ${status}</div>
          <div>Tracker : ${url}</div>
          <p>Thank you</p>
      </body>
      </html>`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "wear.from.brand@gmail.com",
                    pass: "xdfz zzgj bmhr dtxq",
                },
                connectionTimeout: 5 * 60 * 1000, // 5 min
            });

            const info = await transporter.sendMail({
                from: "wear.from.brand@gmail.com",
                to,
                subject,
                html: htmlContent,
            });

            console.log('Message sent: %s', info.messageId);

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default sendMail;
