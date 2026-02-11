import { db } from "../../DB/Modules/connection.js";

export const insertAuthor = async (data) => {
  const result = await db.collection("authors").insertOne(data);

  return result;
};