import dotenv from "dotenv";
import path from "path";
import connectDb, { disconnectDb } from "./lib/db-connect";

dotenv.config();
const migrationName = process.argv[2]; // e.g., `2025-05-03-rename-email-to-phoneNumber.ts`

async function runMigration() {
    if (!migrationName) throw new Error("Please provide a migration filename.");
    await connectDb()

    const migrationPath = path.join(__dirname, "migrations", migrationName);
    const { up } = await import(migrationPath);

    if (typeof up === "function") {
        console.log(`▶ Running migration: ${migrationName}`);
        await up();
        console.log(`✔ Done`);
    } else {
        console.warn(`⚠ Skipped: no 'up' function found.`);
    }

    await disconnectDb()
}

runMigration().catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
});
