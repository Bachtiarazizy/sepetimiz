// import React from "react";
// import { Resend } from "resend";
// import { getErrorMessage, validateString } from "@/lib/email";
// import ContactFormEmail from "@/components/products/ProductsEmails";
// import VerificationEmail from "@/components/products/VerificationEmail";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendEmail(formData: FormData) {
//   const senderEmail = formData.get("senderEmail");
//   const message = formData.get("message");

//   // Simple server-side validation
//   if (!validateString(senderEmail, 500)) {
//     return { error: "Invalid sender email" };
//   }
//   if (!validateString(message, 5000)) {
//     return { error: "Invalid message" };
//   }

//   let data;
//   try {
//     data = await resend.emails.send({
//       from: "Sepetimiz <onboarding@resend.dev>",
//       to: "sepetimiz.bk@gmail.com",
//       subject: "Message from contact form",
//       reply_to: senderEmail,
//       react: React.createElement(ContactFormEmail, {
//         message: message,
//         senderEmail: senderEmail,
//       }),
//     });
//   } catch (error: unknown) {
//     return { error: getErrorMessage(error) };
//   }

//   return { data };
// }

// export async function sendVerificationEmail(userEmail: string, userName: string) {
//   let data;
//   try {
//     data = await resend.emails.send({
//       from: "Sepetimiz <onboarding@resend.dev>",
//       to: userEmail,
//       subject: "Account Verification Successful",
//       react: React.createElement(VerificationEmail, { userName }),
//     });
//   } catch (error: unknown) {
//     return { error: getErrorMessage(error) };
//   }

//   return { data };
// }

"use server";

import React from "react";
import { Resend } from "resend";

import ContactFormEmail from "@/components/products/ProductsEmails";
import { getErrorMessage, validateString } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

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
      to: "sepetimiz.bk@gmail.com",
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