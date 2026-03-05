import dotenv from 'dotenv';
import path from "path";


export const NODE_ENV = process.env.NODE_ENV;

const envPath = {
    dev: path.resolve("./config/.env.dev"),
    prod: path.resolve("./config/.env.prod"),
};

dotenv.config({path : envPath[NODE_ENV || 'dev']})

export const SERVER_PORT = process.env.PORT|| 3000;
export const Database_URL = process.env.Database_URL
export const SALT_ROUND = parseInt(process.env.SALT_ROUND)
