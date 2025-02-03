import db from "@/db";
import { instructor, profile, role, student, user } from "@/db/schema";
import { UpgradeRegisterType, RegisterType } from "@/models/user";
import { hashPassword } from "@/utils/Hash";
import { seqNumber } from "@/utils/Year";
import { eq } from "drizzle-orm";

export const userRegister = async (body: RegisterType) => {
  return await db.transaction(async (tx) => {
    const alreadyExists = await tx.query.profile.findFirst({
      where: eq(profile.email, body.email),
    });

    if (alreadyExists) throw new Error("Email already exist");

    const [new_profile] = await tx
      .insert(profile)
      .values({
        firstname: body.firstname.toLowerCase(),
        lastname: body.lastname.toLowerCase(),
        email: body.email.toLowerCase(),
        date_of_birth: body.date_of_birth.toISOString(),
        gender: body.gender as "male" | "female" | "other",
        phone_number: body.phone_number,
        address: body.address,
      })
      .returning();

    if (!new_profile) throw new Error("Failed to create user");

    const find_role = await tx.query.role.findFirst({
      where: eq(role.name, "user"),
    });

    const [new_user] = await tx
      .insert(user)
      .values({
        profile_id: new_profile.id,
        username: body.username.toLowerCase(),
        password: await hashPassword(body.password),
        status: "active",
        role_id: find_role?.id,
      })
      .returning();

    if (!new_user) throw new Error("Failed to create user");

    return new_user;
  });
};

export const upgradeRegister = async (
  type: "student" | "instructor",
  id: string,
  body?: UpgradeRegisterType
) => {
  const [new_upgrade] = await db.transaction(async (tx) => {
    const get_user = await tx.query.user.findFirst({
      where: eq(user?.id, id),
      with: {
        role: true,
      },
    });

    if (get_user?.role.name !== "user") throw new Error(`Cannot be ${type}`);

    const count = async () => {
      let c: any[] = [];
      if (type === "student") c = await tx.query.student.findMany();
      if (type === "instructor") c = await tx.query.instructor.findMany();
      return c.length + 1;
    };

    const new_craete = {
      student: {
        schema: student,
        data: {
          user_id: id,
          number: seqNumber(await count(), -2),
          admission_date: new Date().toISOString(),
        },
      },
      instructor: {
        schema: instructor,
        data: {
          user_id: id,
          number: seqNumber(await count(), 0),
          hire_date: body?.hire_date.toISOString(),
          department_id: body?.department_id,
        },
      },
    };

    const create_upgrade = await tx
      .insert(new_craete[type].schema)
      .values(new_craete[type].data)
      .returning();

    const new_role = await tx.query.role.findFirst({
      where: eq(role.name, type === "student" ? "student" : "staff"),
    });

    await tx.update(user).set({
      role_id: new_role?.id,
    });

    return create_upgrade;
  });

  return new_upgrade;
};
