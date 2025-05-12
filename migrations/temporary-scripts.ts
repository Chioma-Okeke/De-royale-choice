import connectDb, { disconnectDb } from "@/lib/db-connect";
import Item from "@/models/item-model";

export async function caseChangeMigration() {
  try {
    await connectDb();

    const result = await Item.updateMany(
      {
        ItemPrice: { $exists: true },
        CategoryId: { $exists: true }
      },
      [
        {
          $set: {
            itemPrice: "$ItemPrice",
            categoryId: "$CategoryId"
          }
        },
        {
          $unset: ["ItemPrice", "CategoryId"]
        }
      ]
    );

    console.log("Migration complete:", result.modifiedCount, "documents updated.");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    await disconnectDb();
  }
}
