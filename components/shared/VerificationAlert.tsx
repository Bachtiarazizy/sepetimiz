"use client"; // This directive is required to use client-side hooks and event handlers

import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

function VerificationAlert() {
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "failed" | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchVerificationStatus() {
      try {
        const response = await fetch("/api/verification-status");
        const data = await response.json();

        if (data.status === "error") {
          console.error(data.message);
          setVerificationStatus(null);
        } else {
          setVerificationStatus(data.status);
        }
      } catch (error) {
        console.error("Failed to fetch verification status", error);
        setVerificationStatus(null);
      }
    }

    fetchVerificationStatus();
  }, []);

  const handleRedirect = () => {
    router.push("/Dashboard/verification");
  };
  const handleRedirects = () => {
    router.push("/");
  };

  return (
    <div className="alert-container">
      {verificationStatus === "pending" ? (
        <Alert>
          <AlertTitle className="text-2xl">Verification Required</AlertTitle>
          <AlertDescription className="text-sm sm:text-lg">Your account verification is still pending. Please wait for the verification to access all features.</AlertDescription>
          <div className="flex justify-start gap-4">
            <Button className="mt-4" onClick={handleRedirect}>
              Go to Verification Page
            </Button>
            <Button className="mt-4" onClick={handleRedirects}>
              Go to HomePage
            </Button>
          </div>
        </Alert>
      ) : verificationStatus === "success" ? (
        <Alert>
          <AlertTitle className="text-2xl">Verification Completed</AlertTitle>
          <AlertDescription className="text-sm sm:text-lg">Your account has been successfully verified. You can now proceed to sell products.</AlertDescription>
        </Alert>
      ) : verificationStatus === "failed" ? (
        <Alert>
          <AlertTitle className="text-2xl">Verification Failed</AlertTitle>
          <AlertDescription className="text-sm sm:text-lg">Your account verification has failed. Please try again or contact support.</AlertDescription>
        </Alert>
      ) : (
        <Alert>
          <AlertTitle className="text-2xl">Verification Status Unknown</AlertTitle>
          <AlertDescription className="text-sm sm:text-lg">We could not determine your verification status. Please try again later or contact support.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default VerificationAlert;
