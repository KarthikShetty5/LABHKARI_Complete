import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface SendMailRequest extends NextApiRequest {
    body: {
        to: string;
        subject: string;
        url: string;
        status: string;
        shipment_id: string;
        courier_name: string;
        edd: string;
    };
}

const sendMail = async (req: SendMailRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { to, subject, url, status, shipment_id, courier_name, edd } = req.body;

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
          <div>Shipment Id id : ${shipment_id}</div> 
          <div>Courier name : ${courier_name}</div> 
          <div>Expected date of delivery : ${edd}</div>
          <br/><br/>
        <p>Thank you</p>
        <img src="https://labhkari.s3.ap-south-1.amazonaws.com/logo2.png" width="90" height="40">
      </body>
      </html>`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "labhkarishop@gmail.com",
                    pass: "doht aoql krsz cwt",
                },
                connectionTimeout: 5 * 60 * 1000, // 5 min
            });

            const info = await transporter.sendMail({
                from: "labhkarishop@gmail.com",
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
