// pages/api/getUser.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  return res.status(200).json(user);
}
