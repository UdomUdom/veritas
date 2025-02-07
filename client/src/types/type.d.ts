export interface TableRow {
  id: number;
  profile_id: number;
  username: string;
  password: string;
  status: string;
  role_id: number;
  profile: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    date_of_birth: string;
    gender: string;
    phone_number: string;
    address: string;
    bio: string;
    avatar: string;
  };
}

interface TableDetailsProps {
  editRow: TableRow | null;
  details: TableRow | null;
  user: UserProfile;
  onSave: (updatedRow: TableRow) => void;
  onClose: () => void;
}

interface Profile {
  id: number;
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
interface TableDetailsProps {
  editRow?: boolean;
  details?: boolean;
  user: StaffProfile;
  onClose: () => void;
  onSave: (row: TableRow) => Promise<void>;
}

interface ProfileSettingProps {
  user: StaffProfile;
  onSave: (updatedUser: StaffProfile) => Promise<void>;
  isLoading?: boolean;
  onClose?: () => void;
}
