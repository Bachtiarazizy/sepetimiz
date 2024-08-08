import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";

// Define types for the fetched data
interface User {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  userRole: "ADMIN" | "USER";
  verificationStatus: "pending" | "success" | "failed";
}

interface VerificationData {
  id: string;
  name: string;
  email: string;
  address: string;
  identityNumber: string;
  photoUrl: string[];
  studentDocument: string[];
  phoneNumber: string;
  user: User;
}

// Fetch verification data by ID
async function fetchVerificationDataById(id: string): Promise<VerificationData | null> {
  const verificationData = await prisma.verificationData.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      identityNumber: true,
      photoUrl: true,
      studentDocument: true,
      phoneNumber: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profileImage: true,
          userRole: true,
          verificationStatus: true,
        },
      },
    },
  });
  return verificationData;
}

// Verify user
async function verifyUser(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { verificationStatus: "success" },
  });
}

export default function VerificationPage() {
  const router = useRouter();
  const { id } = router.query;

  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchVerificationDataById(id as string).then((data) => {
        setVerificationData(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleVerify = async () => {
    if (verificationData?.user?.id) {
      await verifyUser(verificationData.user.id);
      // Optionally, you can add a notification, redirect, or update the UI after verification
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!verificationData) return <div>Verification data not found</div>;

  return (
    <div>
      <h1>Verification Details</h1>
      <div>
        <img src={verificationData.user.profileImage || "/default-profile.png"} alt="Profile Image" className="rounded-full w-16 h-16 object-cover" />
        <p>
          <strong>Name:</strong> {verificationData.name}
        </p>
        <p>
          <strong>Email:</strong> {verificationData.email}
        </p>
        <p>
          <strong>Address:</strong> {verificationData.address}
        </p>
        <p>
          <strong>Identity Number:</strong> {verificationData.identityNumber}
        </p>
        <p>
          <strong>Phone Number:</strong> {verificationData.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {verificationData.user.userRole}
        </p>
        <p>
          <strong>Verification Status:</strong> {verificationData.user.verificationStatus}
        </p>
        <Button onClick={handleVerify} disabled={verificationData.user.verificationStatus === "success"}>
          Verify User
        </Button>
      </div>
    </div>
  );
}
