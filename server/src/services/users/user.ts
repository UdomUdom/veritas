import db from "@/db";
import { informations, instructors, students, users } from "@/db/schema";
import { InformationsType } from "@/models/informations";
import { InstructorType } from "@/models/instructor";
import { UserType } from "@/models/user";
import { generateToken } from "@/utils/Auth";
import { hashPassword, verifyPassword } from "@/utils/Hash";
import { thisYear, seqStudent, seqInstructor } from "@/utils/Year";
import { and, eq, or } from "drizzle-orm";

export const userRegistration = async (data: InformationsType) => {
  const result = await db.transaction(async (tx) => {
    const alreadyUser = await tx.query.informations.findMany({
      where: and(
        eq(informations.firstname, data.firstname),
        eq(informations.lastname, data.lastname),
        or(
          eq(informations.status, "pending"),
          eq(informations.status, "active")
        )
      ),
    });
    if (alreadyUser.length > 0) {
      throw new Error("User already exist");
    }
    const [user] = await tx
      .insert(informations)
      .values({
        ...data,
        firstname: data.firstname.toLowerCase(),
        lastname: data.lastname.toLowerCase(),
        email: data.email.toLowerCase(),
        status: "pending",
      })
      .returning();
    return user;
  });
  return result;
};

const createUser = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    let info = await tx.query.informations.findFirst({
      where: eq(informations.id, id),
    });
    if (!info) throw new Error("Informations not found");
    [info] = await tx
      .update(informations)
      .set({
        status: "active",
      })
      .where(eq(informations.id, id))
      .returning();
    const newUser = `${info.firstname}.${info.lastname.slice(0, 2)}`;
    const [user] = await tx
      .insert(users)
      .values({
        username: `${newUser}${thisYear().slice(-2)}@veritas.ac.th`,
        password: await hashPassword(newUser),
        information_id: info.id,
      })
      .returning();
    return { user, info };
  });
  return result;
};

export const approveStudent = async (id: string) => {
  const { user } = await createUser(id);
  const result = await db.transaction(async (tx) => {
    const count = await tx.query.students.findMany({
      where: eq(students.enrollment_year, thisYear()),
    });
    const [student] = await tx
      .insert(students)
      .values({
        number: seqStudent(count.length + 1),
        user_id: user.id,
        enrollment_year: thisYear(),
      })
      .returning();
    return student;
  });
  return result;
};

export const approveInstructor = async (id: string, data: InstructorType) => {
  const { user, info } = await createUser(id);
  const result = await db.transaction(async (tx) => {
    const count = await tx.query.instructors.findMany({
      where: eq(instructors.hire_year, thisYear()),
    });
    const [instructor] = await tx
      .insert(instructors)
      .values({
        ...data,
        number: seqInstructor(info.department_id, count.length + 1),
        user_id: user.id,
      })
      .returning();
    return instructor;
  });
  return result;
};

export const userLogin = async (data: UserType) => {
  const result = await db.transaction(async (tx) => {
    const user = await tx.query.users.findFirst({
      where: and(eq(users.username, data.username)),
    });
    if (!user) throw new Error("User not found");
    if (!(await verifyPassword(data.password, user.password))) {
      throw new Error("Password not match");
    }
    return user;
  });
  const token = generateToken({ id: result.id });
  return { token, user: result };
};
