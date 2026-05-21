import userModel from "../Models/user.Models.js";
import DBRepo from "./db.repo.js";
class UserRepo extends DBRepo {
    constructor() {
        super(userModel);
    }
    async checkUser(id) {
        return (await this.findOne({ filter: { _id: id } })) != null;
    }
}
export default new UserRepo();
