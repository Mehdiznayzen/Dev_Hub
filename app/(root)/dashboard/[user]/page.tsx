"use client";

import IncompleteProfileCard from "@/components/profile/IncompleteProfileCard";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [isExistingProfile, setIsExistingProfile] = useState<boolean>(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        console.log("Profile:", data.profile);

        setIsExistingProfile(!!data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProfile();
  }, []);

  return (
    <div>
      UserPage
      {
        !isExistingProfile && (
          <IncompleteProfileCard />
        )
      }
    </div>
  );
};

export default UserPage;