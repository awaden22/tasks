import express from 'express';
import { getUserById } from './user.service.js';

const userRouter = express.Router();

userRouter.get('/:id', async (req, res) => {
    
        const user = await getUserById(req.params);
        res.status(200).json({
            message: "User found",
            user: user[0]
        });
    

    });
export default userRouter;
