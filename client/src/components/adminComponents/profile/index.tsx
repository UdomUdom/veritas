"use client"; // Required for state and interactivity
import { useState } from "react";
import Modal from "@/components/adminComponents/uiElements/Modal";

interface ProfileProps {
  user: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    birthdate: string;
    faculty: string;
    avatar: string;
  };
  children?: React.ReactNode;
}

export default function Profile({ user, children }: ProfileProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedUser: typeof user) => {
    setEditedUser(updatedUser);
    setIsEditModalOpen(false);
  };

  return (
    <div className="">
      <h2 className="card-title text-2xl font-bold mb-4">Details</h2>
      <div className="flex flex-col items-center space-y-4">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={editedUser.avatar} alt="Profile Picture" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">
            Name: {editedUser.name} {editedUser.lastname}
          </p>
          <p className="text-md text-gray-500">Email: {editedUser.email}</p>
          <p className="text-md text-gray-500">
            Birthdate: {editedUser.birthdate}
          </p>
          <p className="text-md text-gray-500">Faculty: {editedUser.faculty}</p>
        </div>

        {/* Edit Button */}
        <button className="btn btn-primary mt-4" onClick={handleEdit}>
          Edit Profile
        </button>

        {/* Children (if any) */}
        <div>{children}</div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <Modal title="Edit Profile" onClose={() => setIsEditModalOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(editedUser);
            }}
          >
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                value={editedUser.lastname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastname: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
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
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Birthdate</span>
              </label>
              <input
                type="date"
                value={editedUser.birthdate}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, birthdate: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Faculty</span>
              </label>
              <input
                type="text"
                value={editedUser.faculty}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, faculty: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
