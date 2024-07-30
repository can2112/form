import clientPromise from "../../lib/mongodb";
import axios from "axios";
import apiClient from "@/utils/apiclient";

import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const phone = req.body.number;
    const otp = getRandomInt(1000, 9999);

    const dbClient = await clientPromise;
    const db = dbClient.db('brewery');
    const collection = db.collection('otp');
    await collection.updateOne({phone},{$set:{phone, otp}},{upsert: true});
    await sendOTP(phone, otp)
    res.status(200).json({message:"Otp is send successfully"});
  } else {
    res.status(404).json({ status: false, data: {}, message: "not found" });
  }
}

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

async function sendOTP(phone: string, otp: number){
  await axios({
    method:"GET",
    url:`https://2factor.in/API/V1/778f77d0-4e5c-11ef-8b60-0200cd936042/SMS/+91${phone}/${otp}/sms_template`
  })
}