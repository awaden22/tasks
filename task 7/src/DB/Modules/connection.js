import {MongoClient} from 'mongodb';
import { DB_NAME, DB_URL_ATLAS } from '../../../config/config.service.js';


const client = new MongoClient (DB_URL_ATLAS)

export const db = client.db(DB_NAME)

export async function testdbconnection  () {
 try{
    await client.connect();
    console.log("connection successfully to server");
 }
 catch(err){
    console.log("Failed to connect to DB", err);
 }

}