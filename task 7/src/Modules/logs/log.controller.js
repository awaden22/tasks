import { Router } from "express";
import { createCappedLogCollection, insertLog } from "./log.service.js";

const logRouter = Router();


logRouter.post("/logs/capped", async (req, res, next) => {
  try {
    await createCappedLogCollection();
    return res.status(200).json({ ok: 1 });
  } catch (error) {
    next(error);
  }
});
logRouter.post("/", async(req ,res, next)=>{
  try {
    
    const data = await insertLog(req.body);
    return res.status(200).json({ message: "Log inserted successfully", data });
  } catch (error) {
    next(error);
  }
})
export default logRouter