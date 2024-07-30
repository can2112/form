import clientPromise from "../../lib/mongodb";
import apiClient from "@/utils/apiclient";

import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const phone = req.body.number;
    const otp = req.body.otp;

    const dbClient = await clientPromise;
    const db = dbClient.db('brewery');
    const collection = db.collection('otp');
    const doc = await collection.findOne({phone})
    if(!doc){
      res.status(404).json({status: false, message:"phone not registered"})
      return
    }

    if(`${doc?.otp}` !== otp){
      res.status(400).json({status: false, message:"invalid otp"})
      return
    }

    res.status(200).json({message:"Otp is verified successfully"});
  } else {
    res.status(404).json({ status: false, data: {}, message: "not found" });
  }
}
