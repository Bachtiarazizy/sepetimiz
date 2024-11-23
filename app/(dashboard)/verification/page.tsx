import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Mail, MapPin, Phone, User, FileCheck, Image as ImageIcon, AlertCircle, Clock, PlusCircle } from "lucide-react";

interface VerificationCardProps {
  label: string;
  value: string | null | undefined;
  icon: any;
}

const VerificationCard = ({ label, value, icon: Icon }: VerificationCardProps) => (
  <div className="flex items-start space-x-3">
    <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none">{label}</p>
      <p className="text-sm text-muted-foreground">{value || "Not provided"}</p>
    </div>
  </div>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-500 hover:bg-green-600";
    case "REJECTED":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-yellow-500 hover:bg-yellow-600";
  }
};

const VerificationPage = async ({ params }: { params: { shopId: string } }) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const verificationData = await prisma.verificationData.findFirst({
    where: {
      shopId: params.shopId,
    },
  });

  if (!verificationData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-secondary/50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <p>No verification data found for this shop.</p>
            </div>
            <Link href={`/shops/${params.shopId}/verification/create`}>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Start Verification Process
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 bg-secondary/50 text-secondary-foreground min-h-[calc(100vh-80px)] md:rounded-tl-3xl">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-4xl font-bold">Verification Details</h1>
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(verificationData.status)}>{verificationData.status}</Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {format(new Date(verificationData.createdAt), "PPP")}
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <VerificationCard label="Full Name" value={verificationData.title} icon={User} />
            <VerificationCard label="Email" value={verificationData.email} icon={Mail} />
            <VerificationCard label="Phone Number" value={verificationData.phoneNumber} icon={Phone} />
            <VerificationCard label="Address" value={verificationData.address} icon={MapPin} />
            <VerificationCard label="Identity Number" value={verificationData.identityNumber} icon={FileCheck} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents & Photos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {verificationData.photoUrl && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Profile Photo</h3>
                </div>
                <img src={verificationData.photoUrl} alt="Profile" className="rounded-lg w-full max-w-md h-48 object-cover" />
              </div>
            )}

            {verificationData.photoWithDocument && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Photo with Document</h3>
                </div>
                <img src={verificationData.photoWithDocument} alt="Document Verification" className="rounded-lg w-full max-w-md h-48 object-cover" />
              </div>
            )}

            {verificationData.studentDocument && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Student Document</h3>
                </div>
                <img src={verificationData.studentDocument} alt="Student Document" className="rounded-lg w-full max-w-md h-48 object-cover" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationPage;
