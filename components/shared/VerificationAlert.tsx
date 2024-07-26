"use client"; // This directive is required to use client-side hooks and event handlers

import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

function VerificationAlert() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/Dashboard/verification");
  };

  return (
    <div className="alert-container">
      <Alert>
        <AlertTitle className="text-2xl">Verification Required</AlertTitle>
        <AlertDescription className="text-sm sm:text-lg">You need to verify your account to sell products. Please verify your account to continue.</AlertDescription>
        <Button className="mt-4" onClick={handleRedirect}>
          Go to Verification Page
        </Button>
      </Alert>
    </div>
  );
}

export default VerificationAlert;
