import db from ".";
import { departments, faculties, roles } from "./schema";

const rolesMock = [
  { name: "[Test] student" },
  { name: "[Test] teacher" },
  { name: "[Test] admin" },
];

const facultiesMock = [
  { name: "[Test] Arts" },
  { name: "[Test] Business" },
  { name: "[Test] Engineering" },
  { name: "[Test] Science" },
];

const departmentsMock = [
  { name: "[Test] Arts", faculty_id: 1, roles_id: 1 },
  { name: "[Test] Business", faculty_id: 2, roles_id: 2 },
  { name: "[Test] Engineering", faculty_id: 3, roles_id: 3 },
  { name: "[Test] Science", faculty_id: 4, roles_id: 1 },
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
