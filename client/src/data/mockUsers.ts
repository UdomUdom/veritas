export interface UserProfile {
  id: number;
  profile: {
    firstname: string;
    lastname: string;
    email: string;
  };
  birthdate: string;
  faculty: string;
  avatar: string;
}

export const mockUsers: UserProfile[] = [
  {
    id: 1,
    profile: {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
    },
    birthdate: "1990-05-15",
    faculty: "Computer Science",
    avatar:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
  {
    id: 2,
    profile: {
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@example.com",
    },
    birthdate: "1995-08-22",
    faculty: "Engineering",
    avatar:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  },
];
