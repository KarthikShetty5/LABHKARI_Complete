import User from "@/model/User.model";
import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from "@/middleware/mongoose";
import Token from "@/model/Token.model";
import axios from "axios";

const forgotHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body.sendSMS) {
        let useCrrnt = await User.findOne({ phone: req.body.phone })
        if (!useCrrnt) {
            let tok = Math.floor(100000 + Math.random() * 900000).toString();
            let token = new Token({
                tokenexpiry: new Date().toLocaleTimeString("en-GB"),
                phone: req.body.phone,
                token: tok
            });
            await token.save();

            try {
                let phone = `+91${req.body.phone}`;
                const url = 'https://control.msg91.com/api/v5/flow';
                const body = {
                    "template_id": "66824acad6fc0514e72df692",
                    "short_url": "0",
                    "realTimeResponse": "0",
                    "recipients": [
                        {
                            "mobiles": phone,
                            "var1": tok
                        }
                    ]
                };
                const headers = {
                    'Content-Type': 'application/json',
                    'authkey': '425451ASmHe7ey66823449P1',
                    'Accept': 'application/json'
                };

                const response = await axios.post(url, body, { headers });
                res.status(200).json({ success: true });
            } catch (error: any) {
                throw error;
            }
        } else {
            res.status(200).json({ success: false, message: "User already exists" });
        }
    } else {
        let token = req.body.token;
        let phone = req.body.phone;
        let user = await Token.findOne({ token });
        if (!user) {
            res.status(400).json({ success: false, message: "Invalid token" });
            return;
        }

        let tok = user.tokenexpiry;
        let exp = tok.split('')[3];
        let exp1 = tok.split('')[4];
        let expe = exp.concat(exp1);
        let now = new Date().getMinutes();

        if (Math.abs(now - parseInt(expe)) < 5) {
            res.status(200).json({ success: true, message: "Token not expired" });
        } else {
            res.status(200).json({ success: false, message: "Token expired" });
        }
    }
}

export default connectDb(forgotHandler);
