export interface TableRow {
  id: number;
  name: string;
  age: number;
  email: string;
}

interface TableDetailsProps {
  editRow: TableRow | null;
  details: TableRow | null;
  user: UserProfile;
  onSave: (updatedRow: TableRow) => void;
  onClose: () => void;
}
