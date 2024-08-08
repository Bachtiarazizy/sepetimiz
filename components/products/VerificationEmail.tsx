// components/products/VerificationEmail.tsx
import React from "react";
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type VerificationEmailProps = {
  userName: string;
};

export default function VerificationEmail({ userName }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Account Verification Successful - Sepetimiz</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white border border-gray-300 my-10 px-8 py-6 rounded-lg shadow-md">
              <Heading className="text-xl font-semibold leading-tight mb-4">Hello {userName},</Heading>
              <Text className="mb-4">Your account has been successfully verified! You can now start selling your products on Sepetimiz.</Text>
              <Hr className="my-4 border-gray-200" />
              <Text className="text-gray-700 mb-4">Thank you for being part of our community. If you have any questions, feel free to reach out to us.</Text>
              <Text className="font-semibold">Best regards,</Text>
              <Text className="font-semibold">The Sepetimiz Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
