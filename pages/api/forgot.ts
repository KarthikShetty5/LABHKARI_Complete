import Forgot from "@/model/Forgot.model";
import User from "@/model/User.model";
import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';
import cryptoJs from 'crypto-js';
import connectDb from "@/middleware/mongoose";

const forgotHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    let email: string;

    if (req.body.sendMail) {
        let crrntuser = await User.findOne({ email: req.body.email });
        if (crrntuser) {
            let token = Math.random().toString(36).substr(2);
            let forgot = new Forgot({
                tokenexpiry: new Date().toLocaleTimeString("en-GB"),
                email: req.body.email,
                token: token
            });
            await forgot.save();

            // Send an email to the user
            var sp = req.body.email.split('@');
            email = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Forgot Password</title>
            </head>
            <body>
                <h1>Forgot Password</h1>
                <p>Hello ${sp[0]},</p>
                <p>We have sent you this email in response to your request to reset your password on <b>labhkari.com.</b>
                To reset your password, please follow the link below:</p>
                <a href="https://labhkari.com/forgot?token=${token}">Reset Password</a>
                <p></p>
                <div>If you did not request a password reset, we recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and changing your password.</div>
                <br/><br/>
                <p>Thank you</p>
                <img src="https://labhkari.s3.ap-south-1.amazonaws.com/logo2.png" width="90" height="40">
            </body>
            </html>`;

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "wear.from.brand@gmail.com",
                    pass: "xdfz zzgj bmhr dtxq",
                },
                connectionTimeout: 5 * 60 * 1000, // 5 min
            });

            let info = await transporter.sendMail({
                from: "wear.from.brand@gmail.com",
                to: req.body.email,
                subject: "Password Reset Link",
                html: email
            });
            res.status(200).json({ success: true });
        } else {
            res.status(200).json({ success: false });
        }
    } else {
        let token = req.body.token; // get the token of the user also 
        let user = await Forgot.findOne({ token });
        if (!user) {
            res.status(400).json({ success: false, message: "Invalid token" });
            return;
        }

        let tok = user.tokenexpiry;
        let exp = tok.split('')[3];
        let exp1 = tok.split('')[4];
        let expe = exp.concat(exp1);
        let now = new Date().getMinutes();
        console.log(exp, exp1);

        if (Math.abs(now - parseInt(expe)) < 5) {
            let dbuser = await User.findOne({ email: user.email });
            if (dbuser && req.body.password === req.body.cpassword) {
                // Find the corresponding user by email and update their password
                await User.findOneAndUpdate(
                    { email: dbuser.email },
                    { password: cryptoJs.AES.encrypt(req.body.cpassword, 'secret').toString() }
                );
                res.status(200).json({ success: true });
                return;
            } else {
                res.status(400).json({ success: false, message: "Passwords do not match" });
            }
        } else {
            res.status(400).json({ success: false, message: "Token expired" });
        }
    }
}

export default connectDb(forgotHandler)