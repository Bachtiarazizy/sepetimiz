"use server";

import React from "react";
import { Resend } from "resend";
import { NextApiRequest } from "next";

import ContactFormEmail from "@/components/products/ProductsEmails";
import { getErrorMessage, validateString } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextApiRequest) {
  const { senderEmail, message } = req.body;

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Sepetimiz <onboarding@resend.dev>",
      to: "bachtiarazizy@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
}
