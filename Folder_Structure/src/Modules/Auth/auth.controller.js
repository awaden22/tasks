import express from 'express';
import * as authSercice from './auth.service.js';

const authRouter = express.Router();

authRouter.get('/',(req,res)=>{
    res.send("Home page");
})








export default authRouter