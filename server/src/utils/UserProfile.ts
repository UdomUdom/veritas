import db from "@/db";
import { departments, informations } from "@/db/schema";
import { verifyType } from "@/middlewares";
import { eq } from "drizzle-orm";

export const getUserProfile = async (verify: verifyType) => {
  const { user, department } = await db.transaction(async (tx) => {
    const user = await tx.query.informations.findFirst({
      where: eq(informations.user_id, verify.id),
      with: {
        user: true,
      },
    });
    if (!user) throw new Error("Unauthorized");

    const department = await tx.query.departments.findFirst({
      where: eq(departments.id, user.department_id),
      with: {
        faculty: true,
      },
    });
    return { user, department };
  });

  const result = {
    username: user.user?.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    birthday: user.birthday,
    address: user.address,
    bio: user.bio,
    picture: user.picture,
    role: verify.role,
    department: department?.name,
    faculty: department?.faculty?.name,
  };
  return result;
};
