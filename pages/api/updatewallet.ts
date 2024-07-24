import { NextApiRequest, NextApiResponse } from "next";
import Wallet from "@/model/Wallet.model";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";

const updateWallet = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    userId,
    referralIncome,
    promos,
    performanceBonus,
    eShopEarning,
    leaderShipBonus,
    otherFund,
    points,
  } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required",
    });
  }

  try {
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      const newWallet = new Wallet({
        WalletId: new mongoose.Types.ObjectId().toString(),
        userId,
        referralIncome: referralIncome || 0,
        promos: promos || "",
        performanceBonus: performanceBonus || 0,
        eShopEarning: eShopEarning || 0,
        leaderShipBonus: leaderShipBonus || 0,
        otherFund: otherFund || 0,
      });

      await newWallet.save();

      return res.status(201).json({
        success: true,
        message: "Wallet created and income added",
        data: newWallet,
      });
    } else {
      wallet.referralIncome += referralIncome || 0;
      wallet.promos = wallet.promos ? `${wallet.promos}, ${promos}` : promos;
      wallet.performanceBonus += performanceBonus || 0;
      wallet.eShopEarning += eShopEarning || 0;
      wallet.leaderShipBonus += leaderShipBonus || 0;
      wallet.otherFund += otherFund || 0;
      wallet.points += points || 0;

      await wallet.save();

      return res.status(200).json({
        success: true,
        message: "Income updated in existing wallet",
        data: wallet,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default connectDb(updateWallet);
