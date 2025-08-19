import { faker } from "@faker-js/faker";
import { client, db } from '../db';
import { user } from "./schema/auth.schema";
import { statusEnum, transactions } from "./schema/transactions.schema";

async function main() {

    console.log("🌱 Seeding users' transactions...");

    await db.delete(transactions)

    const allUsers = await db.select().from(user)

    if (allUsers.length === 0) {
        console.log("🚫 No users found. Please create a user first.")
        await client.end()
        return
        }

        for (const user of allUsers) {
           const fakeTransactions = Array.from({ length: 10 }, () => ({
            userId: user.id,
            amount: parseFloat(faker.finance.amount()),
            currency: "USD",
            activity: faker.lorem.sentence(),
            status: faker.helpers.arrayElement(statusEnum.enumValues),
            date: faker.date.recent({ days: 30 }),
          }));

             await db.insert(transactions).values(fakeTransactions);
    console.log(`✅ Seeded ${fakeTransactions.length} transactions for user ${user.id}`);

  }

  console.log("🎉 All users have fake transactions!");
  await client.end();

}



main().catch((err) => {
  console.error(err);
  process.exit(1);
});