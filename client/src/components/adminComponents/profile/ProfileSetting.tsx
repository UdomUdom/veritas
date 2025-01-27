"use client";
import React, { useState } from "react";
import { StaffProfile } from "@/types/type";
import Modal from "@/components/adminComponents/uiElements/Modal";

interface ProfileSettingProps {
  user: StaffProfile;
  onSave: (updatedUser: StaffProfile) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export default function ProfileSetting({
  user,
  onSave,
  onClose,
  isLoading: externalLoading,
}: ProfileSettingProps) {
  const [editedUser, setEditedUser] = useState<StaffProfile>(user);
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = externalLoading || internalLoading;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalLoading(true);

    try {
      await onSave(editedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <Modal title="Edit Profile" onClose={onClose}>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              value={editedUser.firstName}
              onChange={(e) =>
                setEditedUser({ ...editedUser, firstName: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              value={editedUser.lastName}
              onChange={(e) =>
                setEditedUser({ ...editedUser, lastName: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser({ ...editedUser, email: e.target.value })
            }
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            value={editedUser.phoneNumber}
            onChange={(e) =>
              setEditedUser({ ...editedUser, phoneNumber: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            value={editedUser.address}
            onChange={(e) =>
              setEditedUser({ ...editedUser, address: e.target.value })
            }
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
