import ProfileCompletion from "@/components/shared/ProfileCompletion";
import { auth } from "@clerk/nextjs";
import React from "react";

const UpdateProfile = () => {
  const { sessionClaims } = auth();

  const clerkId = sessionClaims?.sub;
  const userId = sessionClaims?.userId as string;
  return (
    <div className="wrapper my-8 items-center flex flex-col gap-8 md:gap-12">
      <ProfileCompletion userId={userId} clerkId={clerkId} />
    </div>
  );
};

export default UpdateProfile;
