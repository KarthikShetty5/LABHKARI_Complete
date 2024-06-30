import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import User from '../../model/User.model'; // Adjust the path based on your actual structure
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import axios from 'axios';

const sendMail = async (to: string, subject: string, name: string) => {
    try {
        const htmlContent = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Registered Successfully</title>
        </head>
        <body>
            <h1>Welcom to Labhkari World</h1>
            <p>User Created Successfully</p> 
            <br/><br/>
            <div>Update your account by visiting <a href="https://labhkari.com/user/profile">https://labhkari.com/user/profile</a></div>
            <p>Thank you, ${name}</p>
            <img src="https://labhkari.s3.ap-south-1.amazonaws.com/logo2.png" width="90" height="40">
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
    } catch (error) {
        console.error(error);
    }
};

async function sendSMS(toNumbers: any) {
    try {
        const accountSid = process.env.NEXT_PUBLIC_ACCOUNT_SID;
        const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        const formattedNumbers = toNumbers.split(',').map((number: string) => `+91${number.trim()}`).join(',');

        client.messages
            .create({
                body: "Your account has been created. Please visit the MyProfile section at http://labhkari.com/user/profile and update your details for better enjoyment of Labhkari.",
                to: formattedNumbers,
                from: process.env.NEXT_PUBLIC_PHONE_NUM,
            })
            .then((message: any) => console.log(message.sid));
    } catch (error: any) {
        throw error;
    }
}


const userRegister = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = ((length, chars) => Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join(''))(5, '0123456789');

    if (req.method !== 'POST') {
        return res.status(400).json({ error: "This method is not allowed" });
    }

    const { name, email, phone, password, referralId } = req.body;

    // if (!name || !email || !phone || !password) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "All fields (username, email, phone, password) are required"
    //     });
    // }


    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    // Check if the email already exists in the database
    try {
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "Phone Number already exists",
            });
        }

        // Encrypt password using AES
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret').toString();

        // Insert new user into the database
        const newUser = new User({
            userId: userId,
            name,
            email,
            phone,
            password: encryptedPassword,
            referralId,
        });
        await newUser.save();
        if (/^user\d+@/.test(email) || password === "") {
            await sendSMS(phone)
        } else {
            await sendMail(email, "User created successfully.", name);
        }

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: { userId: newUser.userId },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
};

export default connectDb(userRegister);
