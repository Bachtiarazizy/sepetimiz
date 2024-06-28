"use server";

import React from "react";
import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from "next";

import ContactFormEmail from "@/components/products/ProductsEmails";
import { getErrorMessage, validateString } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { senderEmail, message } = req.body;

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    res.status(400).json({ error: "Invalid sender email" });
    return;
  }
  if (!validateString(message, 5000)) {
    res.status(400).json({ error: "Invalid message" });
    return;
  }

  try {
    const data = await resend.emails.send({
      from: "Sepetimiz <onboarding@resend.dev>",
      to: "bachtiarazizy@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
}
