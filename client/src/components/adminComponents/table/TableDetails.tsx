"use client";
import { TableDetailsProps, TableRow, StaffProfile } from "@/types/type";
import { useState, useEffect } from "react";
import Modal from "@/components/adminComponents/uiElements/Modal";
import Profile from "@/components/adminComponents/profile";
import ProfileSetting from "@/components/adminComponents/profile/ProfileSetting";

export default function TableDetails(props: TableDetailsProps) {
  const { editRow, onClose, onSave, details, user } = props;
  const [editedUser, setEditedUser] = useState<StaffProfile>(user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleProfileSave = async (updatedUser: StaffProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedRow: TableRow = {
        ...updatedUser,
        id: Number(updatedUser.id),
      };
      await onSave(updatedRow);
      setEditedUser(updatedUser);
      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = editRow ? (
    <div className="p-6">
      <ProfileSetting
        user={editedUser}
        onSave={handleProfileSave}
        onClose={onClose}
        isLoading={isLoading}
      />
      {error && <div className="mt-4 text-sm text-error">{error}</div>}
    </div>
  ) : details ? (
    <div className="p-6">
      <Profile user={user} />
    </div>
  ) : null;

  return (
    <>
      {(editRow || details) && (
        <Modal
          title={editRow ? "Edit Profile" : "Staff Profile"}
          onClose={onClose}
        >
          {modalContent}
        </Modal>
      )}
    </>
  );
}
