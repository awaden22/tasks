import dotenv from 'dotenv';
import path from "path";


export const NODE_ENV = process.env.NODE_ENV;

const envPath = {
    dev: path.resolve("./config/.env.dev"),
    prod: path.resolve("./config/.env.prod"),
};

dotenv.config({path : envPath[NODE_ENV || 'dev']})

export const SERVER_PORT = process.env.PORT|| 3000;
export const DB_URL_LOCAL = process.env.DB_URL_LOCAL|| "";
export const DB_URL_ATLAS = process.env.DB_URL_ATLAS|| "";
export const DB_NAME= process.env.DB_NAME|| "";