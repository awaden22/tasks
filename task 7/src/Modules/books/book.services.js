import { db } from "../../DB/Modules/connection.js";

export const createBooksCollection = async () => {
  try {
    const collection = await db.createCollection("books", {
      validator: {
        $and: [{ title: { $exists: true } }, { title: { $ne: "" } }],
      },
    });
    return collection;
  } catch (error) {
    // If collection already exists, return the existing one
    if (error.codeName === "NamespaceExists") {
      return db.collection("books");
    }
    throw error;
  }
};

export const addBook = async (input) => {
  const { title, author, year, genres } = input;
  const result = await db
    .collection("books")
    .insertOne({ title, author, year, genres });
  return result;
};

export const bookIndexes = async () => {
  const collection = db.collection("books").createIndex({ title: 1 });
  return collection;
};

export const insertmultipleBooks = async (input) => {
  const result = await db.collection("books").insertMany(input);
  return result;
};

export const updateYear = async () => {
  const result = await db
    .collection("books")
    .updateOne({ title: "Future" }, { $set: { year: 2022 } });
    return result ;
};

export const findbytitle = async (input) => {
  const { title } = input;
  const result = await db.collection("books").findOne({ title: title });
  return result;
};

export const findallyear = async () => {
  const result = await db
    .collection("books")
    .find({ year: { $gte: 1990, $lte: 2010 } })
    .toArray();
  return result;
};

export const findbygenre = async (input) => {
  const { genre } = input;
 const result = await db.collection("books").findOne({ genres: { $in: [genre] } });

  return result;
};

export const skip_Limit = async () => {
  const result = await db
    .collection("books")
    .find()
    .skip(2)
    .limit(3)
    .sort({ year: -1 })
    .toArray();
  return result;
};

export async function integerYear() {
  const books = await db
    .collection("books")
    .find({
      year: { $type: "int" },
    })
    .toArray();
  return books;
}

export async function geners() {
  const books = await db
    .collection("books")
    .find({
      genres: { $nin: ["Horror", "Science Fiction"] },
    })
    .toArray();
  return books;
}

export async function deleteYear() {
  const result = await db
    .collection("books")
    .deleteMany({ year: { $lte: 2000 } });
  return result;
}

export async function aggregate1() {
  const books = await db
    .collection("books")
    .aggregate([
      {
        $match: { year: { $gt: 2000 } },
      },
      {
        $sort: { year: -1 },
      },
    ])
    .toArray();

  return books;
}

export async function aggregate2() {
  const books = await db
    .collection("books")
    .aggregate([
      {
        $match: { year: { $gt: 2000 } },
      },
      {
        $project: {
          _id:0,
          title: 1,
          author: 1,
          year: 1,
        },
      },
    ])
    .toArray();

  return books;
}

export const aggregate3 = async () => {
  const books = await db
    .collection("books")
    .aggregate([
      { $unwind: "$genres" }, // فك المصفوفة genres إلى وثائق منفصلة
      { 
        $project: {            // عرض الحقول المطلوبة فقط
          _id: 0,
          title: 1,
          author: 1,
          genres: 1
        } 
      }
    ])
    .toArray();

  return books;
};


export async function aggregate4() {
  const books = await db
    .collection("books")
    .aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "_id",
          foreignField: "bookId",
          as: "logsInfo",
        },
      },
    ])
    .toArray();

  return books;
}
