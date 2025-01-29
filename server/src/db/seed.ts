import fs from "fs";
import path from "path";
import csv from "csv-parser";
import db from ".";

// const raw = [
//   {
//     path: path.join(__dirname, "raw/roles.csv"),
//     schema: role,
//   },
// ];

const processFile = async (filePath: string, schema: any) => {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row: any) => {
        await db.insert(schema).values(row);
      })
      .on("end", () => {
        console.log(`>> ${filePath} imported!`);
        resolve();
      })
      .on("error", (err: any) => {
        console.error(`Error reading file ${filePath}:`, err);
        reject(err);
      });
  });
};

(async function seed() {
  try {
    // for (const item of raw) {
    //   if (!fs.existsSync(item.path)) {
    //     console.error(`File not found: ${item.path}`);
    //     continue;
    //   }
    //   await processFile(item.path, item.schema);
    // }
  } catch (error: unknown) {
    throw new Error(`>> Failed: ${error}`);
  }
})();
