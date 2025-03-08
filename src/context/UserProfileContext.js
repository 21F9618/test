import React, { createContext, useState, useEffect, useContext } from "react";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "./AuthContext"; // Import AuthContext

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useContext(AuthContext); // Get user from AuthContext

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        console.log("No authenticated user.");
        setUserProfile(null);
        return;
      }

      console.log("Fetching user profile for:", user.uid);
      try {
        // Fetch individual profile
        const userDoc = await firestore()
          .collection("individual_profiles")
          .doc(user.uid)
          .get();

        if (userDoc.exists) {
          let userData = userDoc.data();
          console.log("Individual profile found:", userData);

          // Fetch children profiles from `children_profiles` collection
          const childrenDoc = await firestore()
            .collection("children_profiles")
            .doc(user.uid)
            .get();

          if (childrenDoc.exists) {
            const childrenProfiles = childrenDoc.data().children || [];
            userData = { ...userData, childrenProfiles };
            console.log("Children profiles found:", childrenProfiles);
          } else {
            userData = { ...userData, childrenProfiles: [] }; // No children data
            console.log("No children profiles found for user.");
          }

          setUserProfile(userData);
        } else {
          console.log("Individual profile not found in Firestore for user:", user.uid);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [user]); // Runs whenever the user changes

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
