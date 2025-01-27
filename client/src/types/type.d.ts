export interface TableRow {
  role: string;
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
}

interface TableDetailsProps {
  editRow: TableRow | null;
  details: TableRow | null;
  user: UserProfile;
  onSave: (updatedRow: TableRow) => void;
  onClose: () => void;
}

interface StaffProfile {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  faculty: string;
  email: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  role: string;
}

interface TeachersProfile {
  user: {
    id: number;
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: Date;
    faculty: string;
    department: string;
    academicYear: string;
    avatar: string;
    address: string;
    phoneNumber: string;
    linkedin?: string | null;
    role: string;
  };
  children?: React.ReactNode;
}

interface StaffProfile {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  faculty: string;
  email: string;
  birthdate: string;
  address: string;
  phoneNumber: string;
  role: string;
}

interface TableRow extends StaffProfile {
  id: number;
}

interface TableDetailsProps {
  editRow?: boolean;
  details?: boolean;
  user: StaffProfile;
  onClose: () => void;
  onSave: (row: TableRow) => Promise<void>;
}
