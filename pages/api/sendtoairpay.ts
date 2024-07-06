// pages/api/sendtoairpay.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { check, validationResult } from 'express-validator';
import sha256 from 'sha256';
import dateFormat from 'dateformat';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Your validation logic here using check() and validationResult()
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { buyerFirstName, buyerLastName, buyerPhone, amount, buyerEmail, currency, isocurrency, orderid, buyerPinCode } = req.body;
    const now = new Date();

    // Example data concatenation and hashing logic
    const alldata = buyerEmail + buyerFirstName + buyerLastName + amount + orderid;
    const privatekey = sha256(process.env.SECRET + '@' + process.env.USERNAME + ':|:' + process.env.PASSWORD);
    const keySha256 = sha256(process.env.USERNAME + '~:~' + process.env.PASSWORD);
    const aldataWithDate = alldata + dateFormat(now, 'yyyy-mm-dd');
    const checksum = sha256(keySha256 + '@' + aldataWithDate);

    // Example: Rendering data to a template
    res.status(200).json({
      mid: process.env.MID,
      data: req.body,
      privatekey: privatekey,
      checksum: checksum,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default handler;
