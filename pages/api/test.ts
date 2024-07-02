import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.body;
    try {
        const url = 'https://control.msg91.com/api/v5/flow';
        const body = {
            "template_id": "66836682d6fc0565ff2cddf3",
            "short_url": "0",
            "realTimeResponse": "0",
            "recipients": [
                {
                    "mobiles": "+919591142624",
                    "var1": "hello",
                    "var2": "world",
                    "var3": "heyy"
                }
            ]
        };
        const headers = {
            'Content-Type': 'application/json',
            'authkey': process.env.NEXT_PUBLIC_AUTH_KEY,
            'Accept': 'application/json'
        };

        const response = await axios.post(url, body, { headers });
        console.log(response)
    } catch (error: any) {
        console.log(error);
    }
}

export default getUser;