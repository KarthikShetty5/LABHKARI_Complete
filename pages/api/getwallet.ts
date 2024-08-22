import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User.model";
import Kyc from "@/model/Kyc.model";
import Order from "@/model/Order.model";
import Batch from "@/model/Batch.model";
import Promotional from "@/model/Promotional.model";
import Wallet from "@/model/Wallet.model";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";


const calculatePerformanceBonus = (points: number, bv: number): number => {
    if (points < 50 && bv < 2500) return 0;
    if (points >= 50 && points < 100 && bv >= 2500 && bv < 5000) return 3;
    if (points >= 100 && points < 300 && bv >= 5000 && bv < 15000) return 6;
    if (points >= 300 && points < 500 && bv >= 15000 && bv < 25000) return 9;
    if (points >= 500 && points < 1000 && bv >= 25000 && bv < 50000) return 12;
    if (points >= 1000 && points < 1500 && bv >= 50000 && bv < 75000) return 15;
    if (points >= 1500 && points < 2000 && bv >= 75000 && bv < 100000) return 18;
    if (points >= 2000 && bv >= 100000) return 21;
    return 0;
  };


  const getWallet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
  
    try {
      const user = await User.findOne({ userId: userId });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const referralId = user.referralId;
      const kyc = await Kyc.findOne({ userId: userId });
  
      if (referralId && !kyc) {
        const recentOrder = await Order.findOne({ userId: userId }).sort({ createdAt: -1 });
        if (recentOrder) {
          const productIds = recentOrder.productId.split(','); // Assuming productId is a comma-separated string
          console.log("here",productIds)
          for (const productId of productIds) {
          const batch = await Batch.findOne({ productId: productId.trim() });
            if (batch) {
            const batchId = batch.batchNo;
            const promo = await Promotional.findOne({ batchId: batchId }).sort({ applicableDate: -1 });
            if (promo) {
              const wallet = await Wallet.findOne({ userId: referralId });
              if (wallet?.processedOrderIds.includes(recentOrder._id.toString())) {
                console.log("pid",productId)
                // return res.status(200).json({
                //   success: true,
                //   message: "Order has already been processed for wallet update",
                // });
                continue;
              }
  
              const cashAmount = promo.cashAmount;
              const performanceBonus = wallet ? calculatePerformanceBonus(wallet.points, wallet.performanceBonus) : 0;
  
              if (wallet) {
                wallet.referralIncome += cashAmount;
                wallet.promos = "";
                wallet.performanceBonus += performanceBonus;
                wallet.processedOrderIds.push(recentOrder._id.toString()); // Mark order as processed
                wallet.points += promo.points || 0;
                await wallet.save();
              } else {
                const newWallet = new Wallet({
                  WalletId: new mongoose.Types.ObjectId().toString(),
                  userId: referralId,
                  referralIncome: cashAmount,
                  promos: "",
                  performanceBonus: performanceBonus,
                  processedOrderIds: [recentOrder._id.toString()], // Mark order as processed
                  points: promo.points,
                });
                await newWallet.save();
              }
            }
          }
        }
      }
  
        return res.status(200).json({
          success: true,
          message: "Calculated wallet amount and added for Referral",
        });
      }
  
      if (kyc) {
        const recentOrder = await Order.findOne({ userId: userId }).sort({ createdAt: -1 });
        if (recentOrder) {
          const productId = recentOrder.productId;
          const batch = await Batch.findOne({ productId: productId });
          if (batch) {
            const batchId = batch.batchNo;
            const promo = await Promotional.findOne({ batchId: batchId }).sort({ applicableDate: -1 });
            if (promo) {
              const wallet = await Wallet.findOne({ userId: userId });
  
              if (wallet?.processedOrderIds.includes(recentOrder._id.toString())) {
                return res.status(200).json({
                  success: true,
                  message: "Order has already been processed for wallet update",
                });
              }
  
              const cashAmount = promo.cashAmount;
              const performanceBonus = wallet ? calculatePerformanceBonus(wallet.points, wallet.performanceBonus) : 0;
  
              if (wallet) {
                wallet.referralIncome += cashAmount;
                wallet.promos = "";
                wallet.performanceBonus += performanceBonus;
                wallet.processedOrderIds.push(recentOrder._id.toString()); // Mark order as processed
                wallet.points += promo.points || 0;
                await wallet.save();
              } else {
                const newWallet = new Wallet({
                  WalletId: new mongoose.Types.ObjectId().toString(),
                  userId: userId,
                  referralIncome: cashAmount,
                  promos: "",
                  performanceBonus: performanceBonus,
                  processedOrderIds: [recentOrder._id.toString()], // Mark order as processed
                  points: promo.points,
                });
                await newWallet.save();
              }
            }
          }
        }
  
        return res.status(200).json({
          success: true,
          message: "Calculated wallet amount and added for User",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Amount not added anywhere",
      });

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
};
    
export default connectDb(getWallet);
