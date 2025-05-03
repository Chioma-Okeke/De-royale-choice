import Contact from "@/models/contact-nodel";

export async function up() {
    const result = await Contact.updateMany(
        {email: { $exists: true}},
        [
            {$set: {phoneNumber: "$email"}},
            {$unset: "email"}
        ]
    )
    console.log(`[rename-email-to-phoneNumber] Updated ${result.modifiedCount} documents.`)
}