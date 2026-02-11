import { Router } from "express";
import { insertAuthor } from "./author.services.js";

 const authorRouter = Router();


authorRouter.post("/authors", async (req, res, next) => {
  try {
    const data = await insertAuthor(req.body);
    return res.status(200).json({ message: "Author added successfully", data });
  } catch (error) {
    next(error);
  }
});

export default authorRouter;