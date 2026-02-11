import { ObjectId } from "mongodb";
import { db } from "../../DB/Modules/connection.js";


export const createCappedLogCollection = async () => {
  try {
    const collection = await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024,
    });
    return collection;
  } catch (error) {
    return { message: "capped collection already exists"}
  
  }
};

export const insertLog = async (input)=>{
  const { bookId : book_id,  
          action:action} = input;

  const result = await db.collection("logs").insertMany([
    {
     bookId : ObjectId(book_id),
     action:action
    },
  ]);
  return result;

}