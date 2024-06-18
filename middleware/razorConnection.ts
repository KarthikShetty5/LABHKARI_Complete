import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

export const instance = new Razorpay({
    key_id: 'rzp_test_y5kB7jPsNn1fCY',
    key_secret: 'i2xuKx6iAFHlyhMmyfbbylGO'
});
