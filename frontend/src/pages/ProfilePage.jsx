
import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
  } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result;

      setSelectedImg(base64Image);

      const success = await updateProfile({
        profilePic: base64Image,
      });

      if (!success) {
        setSelectedImg(null);
      }
    };

    reader.onerror = () => {
      setSelectedImg(null);
    };

    reader.readAsDataURL(file);
  };

  if (!authUser) return null;

  return (
    <main className="min-h-screen bg-base-100 px-4 pb-10 pt-24">
      <div className="mx-auto w-full max-w-2xl">

        <div className="space-y-8 rounded-2xl border border-base-300 bg-base-200 p-5 shadow-sm sm:p-8">

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              Profile
            </h1>

            <p className="mt-2 text-sm text-base-content/60">
              Your profile information
            </p>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  selectedImg ||
                  authUser.profilePic ||
                  "/avatar.png"
                }
                alt="Profile"
                className="size-32 rounded-full border-4 border-base-100 object-cover shadow-md"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-1 flex size-10 cursor-pointer
                  items-center justify-center rounded-full
                  bg-primary text-primary-content shadow-md
                  transition-transform hover:scale-105
                  ${
                    isUpdatingProfile
                      ? "pointer-events-none animate-pulse opacity-70"
                      : ""
                  }
                `}
              >
                <Camera className="size-5" />

                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-center text-sm text-base-content/60">
              {isUpdatingProfile
                ? "Uploading profile picture..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Information */}
          <div className="space-y-5">

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-base-content/60">
                <User className="size-4" />
                Full Name
              </div>

              <p className="rounded-lg border border-base-300 bg-base-100 px-4 py-3 font-medium">
                {authUser.fullName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-base-content/60">
                <Mail className="size-4" />
                Email Address
              </div>

              <p className="break-all rounded-lg border border-base-300 bg-base-100 px-4 py-3 font-medium">
                {authUser.email}
              </p>
            </div>

          </div>

          {/* Account Information */}
          <div className="rounded-xl border border-base-300 bg-base-100 p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Account Information
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex items-center justify-between gap-4 border-b border-base-300 py-2">
                <span className="text-base-content/60">
                  Member Since
                </span>

                <span className="font-medium">
                  {authUser.createdAt
                    ? new Date(authUser.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-2">
                <span className="text-base-content/60">
                  Account Status
                </span>

                <span className="font-medium text-success">
                  Active
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
