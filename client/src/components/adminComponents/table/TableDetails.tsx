"use client";
import { TableDetailsProps } from "@/types/type";
import Modal from "@/components/adminComponents/uiElements/Modal";
import Profile from "@/components/adminComponents/profile";
import TableForm from "./TableForm";

export default function TableDetails(props: TableDetailsProps) {
  const { editRow, onClose, onSave, details, user } = props;
  return (
    <>
      {editRow && (
        <Modal title="Edit Profile" onClose={onClose}>
          <TableForm
            initialValues={editRow}
            onSubmit={onSave}
            onCancel={onClose}
          />
        </Modal>
      )}

      {details && (
        <Modal title="Profile Details" onClose={onClose}>
          <Profile user={user} />
        </Modal>
      )}
    </>
  );
}
