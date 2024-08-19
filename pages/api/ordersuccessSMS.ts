import User from '@/model/User.model';
import {NextApiRequest, NextApiResponse} from 'next';
import connectionDb from '@/middleware/mongoose';
import Token from "@/model/Token.model";
import axios from 'axios';

const ordersuccessSMS = async(req:NextApiRequest, res:NextApiResponse) => {

    try {
        let phone = `+91${req.body.phone}`;
        let orderId = req.body.orderId;
        let trackurl = req.body.url;
        const url = 'https://control.msg91.com/api/v5/flow';
        const body = {
            "template_id":process.env.NEXT_PUBLIC_TEMPLATE_ID_ORD,
            "short_url":"0",
            "realTimeResponse":"0",
            "recipients":[
                {
                    "mobiles": phone,
                    "var1": orderId,
                    "var2": trackurl
                }
            ]
        }

        const headers = {
            'Content-Type':'application/json',
            'authkey':process.env.NEXT_PUBLIC_AUTH_KEY,
            'Accept':'application/json'
        }

        const response = await axios.post(url,body, {headers});
        res.status(200).json({success:true});
    } catch (error:any) {
        throw error;
    }
}

export default connectionDb(ordersuccessSMS);
