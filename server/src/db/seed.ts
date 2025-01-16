import db from ".";
import { departments, faculties, roles } from "./schema";

const rolesMock = [
  { name: "[Test] student" },
  { name: "[Test] teacher" },
  { name: "[Test] admin" },
];

const facultiesMock = [
  { name: "[Test] Science" },
  { name: "[Test] Arts" },
  { name: "[Test] Engineering" },
];

const departmentsMock = [
  { name: "[Test] Physics", faculty_id: 1, role_id: 1 },
  { name: "[Test] Chemistry", faculty_id: 1, role_id: 1 },
  { name: "[Test] History", faculty_id: 2, role_id: 1 },
  { name: "[Test] Literature", faculty_id: 2, role_id: 2 },
  { name: "[Test] Mechanical Engineering", faculty_id: 3, role_id: 2 },
  { name: "[Test] Electrical Engineering", faculty_id: 3, role_id: 2 },
];

(async function () {
  try {
    // Roles
    await db.insert(roles).values(rolesMock);
    // Faculties
    await db.insert(faculties).values(facultiesMock);
    // Departments
    await db.insert(departments).values(departmentsMock);
  } catch (error: unknown) {
    throw new Error(`Seed fail: ${error}`);
  }
})();
