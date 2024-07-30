import apiClient from "@/utils/apiclient";

import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.status(200).json("Otp is send successfully");
  } else {
    res.status(404).json({ status: false, data: {}, message: "not found" });
  }
}
