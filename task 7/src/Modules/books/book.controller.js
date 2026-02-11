import { Router } from "express";
import {
  createBooksCollection,
  addBook,
  bookIndexes,
  insertmultipleBooks,
  updateYear,
  findbytitle,
  findallyear,
  findbygenre,
  skip_Limit,
  integerYear,
  geners,
  deleteYear,
  aggregate2,
  aggregate1,
  aggregate3,
} from "./book.services.js";

export const bookRouter = Router();

bookRouter.post("/books", async (req, res, next) => {
  try {
    const data = await createBooksCollection();
    return res.status(200).json({ message: "Collection ready", data });
  } catch (error) {
    next(error);
  }
});

bookRouter.post("/add", async (req, res, next) => {
  try {
    const data = await addBook(req.body);
    return res.status(200).json({ message: "Book added successfully", data });
  } catch (error) {
    next(error);
  }
});

bookRouter.post("/books/indexes", async (req, res, next) => {
  try {
    const data = await bookIndexes();
    return res
      .status(200)
      .json({ message: "Index created successfully", data });
  } catch (error) {
    next(error);
  }
});

bookRouter.post("/batch", async (req, res, next) => {
  const books = await insertmultipleBooks(req.body);
  try {
    return res.status(200).json({ message: "books added successfully", books });
  } catch (error) {
    next(error);
  }
});

bookRouter.patch("/Future", async (req, res, next) => {
  const result = await updateYear();
  if (!result.matchedCount) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "book updated successfully" });
});

bookRouter.get("/title", async (req, res, next) => {
  const result = await findbytitle(req.body);
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "book found", result });
});

bookRouter.get("/year", async (req, res, next) => {
  const result = await findallyear();
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "book found", result });
});

bookRouter.get("/genre", async (req, res, next) => {
  const result = await findbygenre(req.body);
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "book found", result });
});

bookRouter.get("/skip_limit", async (req, res, next) => {
  const result = await skip_Limit();
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "book found", result });
});

bookRouter.get("/integer_year", async (req, res, next) => {
  const result = await integerYear();
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "book found", result });
});

bookRouter.get("/genres", async (req, res, next) => {
  const result = await geners();
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "book found", result });
});

bookRouter.get("/delete_year", async (req, res, next) => {
  const result = await deleteYear();
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res
    .status(200)
    .json({
      message: "book deleted successfully",
      deletedCount: result.deletedCount,
    });
});

bookRouter.get("/aggregate_1", async (req, res, next) => {
  const result = await aggregate1();
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "books found", result });
});

bookRouter.get("/aggregate_2", async (req, res, next) => {
  const result = await aggregate2();
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "books found", result });
});
bookRouter.get("/aggregate_3", async (req, res, next) => {
  const result = await aggregate3();
  if (!result) {
    return res.status(404).json({ message: "book not found" });
  }
  return res.status(200).json({ message: "books found", result });
});

export default bookRouter;
