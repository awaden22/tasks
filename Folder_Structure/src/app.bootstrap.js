import express from 'express';
import authRouter from './Modules/Auth/auth.controller.js';

import {NODE_ENV , SERVER_PORT} from '../config/config.service.js';

function bootstrap(){
    const app = express();
    const port = SERVER_PORT;
    app.use(express.json());

    app.use('/auth',authRouter)



    app.use((error,req,res,next)=>{
        return NODE_ENV =='dev'
        ? res
        .status(error.cause?.statusCode ?? 500)
        .json({
            errMsg: error.message,error,
            stack:error.stack
        })
        :res
        .stack(error.cause.statusCode ?? 500)
        .json({errMsg:error.message || "something went wrong"})
       
          
    })
    


    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
}

export default bootstrap;
