"use client";
import { TableDetailsProps, TableRow, StaffProfile } from "@/types/type";
import { useState } from "react";
import Modal from "@/components/adminComponents/uiElements/Modal";
import Profile from "@/components/adminComponents/profile";
import ProfileSetting from "@/components/adminComponents/profile/ProfileSetting";

export default function TableDetails(props: TableDetailsProps) {
  const { editRow, onClose, onSave, details, user } = props;
  const [editedUser, setEditedUser] = useState<StaffProfile>(user);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSave = async (updatedUser: StaffProfile) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {editRow && (
        <Modal title="Edit Profile" onClose={onClose}>
          <div className="p-6">
            <ProfileSetting
              user={editedUser}
              onSave={handleProfileSave}
              onClose={onClose}
              isLoading={isLoading}
            />
          </div>
        </Modal>
      )}
      {details && (
        <Modal title="Staff Profile" onClose={onClose}>
          <div className="p-6">
            <Profile user={user} />
          </div>
        </Modal>
      )}
    </>
  );
}
