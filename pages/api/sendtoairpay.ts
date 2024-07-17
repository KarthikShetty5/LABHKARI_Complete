import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    TRANSACTIONID,
    APTRANSACTIONID,
    AMOUNT,
    TRANSACTIONSTATUS,
    MESSAGE,
    ap_SecureHash,
    CUSTOMVAR,
  } = req.query;

  // Check if all required parameters are present
  if (!TRANSACTIONID || !APTRANSACTIONID || !AMOUNT || !TRANSACTIONSTATUS || !ap_SecureHash) {
    return res.status(400).json({ error: 'Required parameters are missing.' });
  }

  // Validate secure hash (sCRC calculation)
  const sParam = `${TRANSACTIONID}:${APTRANSACTIONID}:${AMOUNT}:${TRANSACTIONSTATUS}:${MESSAGE}:${process.env.MercId}:${process.env.UserName}`;
  const crc = require('crc');
  const sCRC = crc.crc32(sParam).toString();

  if (sCRC !== ap_SecureHash) {
    return res.status(400).json({ error: 'Secure hash validation failed.' });
  }

  // Return success response
  res.status(200).json({
    transid: TRANSACTIONID,
    apTransactionID: APTRANSACTIONID,
    amount: AMOUNT,
    transtatus: TRANSACTIONSTATUS,
    message: MESSAGE,
    customvar: CUSTOMVAR,
  });
}
