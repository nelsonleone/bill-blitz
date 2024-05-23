import { getDB } from "$lib/db/mongodbClient";
import { ObjectId } from "mongodb";

export async function checkUserExists(email: string | unknown): Promise<boolean> {
    try {
      const db = await getDB()
      const user = await db?.collection('billBlitzUsers').findOne({ email: "bubu@gmail.com" })
      console.log(user)
      return !!user;
    } catch (error) {
      console.error('Error checking if user exists:', error)
      return false;
    }
}