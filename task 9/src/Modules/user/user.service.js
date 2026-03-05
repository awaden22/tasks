    
import connection from "../../DB/Modules/connection.js";
    export async function getUserById(data){
        const {id}= data;
        const searchId = `
        select * 
        from user 
        where id =?`;

        const results = await connection.execute(searchId, [id]);
         if (! results[0].length){
            throw new Error ("user not found",{
                cause:{
                    status_code:404
                }
            })
         }
         return results;
         

    }