class DBRepo {
    Model;
    constructor(Model) {
        this.Model = Model;
    }
    async create({ data, options, }) {
        return await this.Model.create(data, options);
    }
    findOne({ filter, projection, options, }) {
        return this.Model.findOne(filter, projection, options);
    }
    findById({ id, projection, options, }) {
        return this.Model.findById(id, projection, options);
    }
}
export default DBRepo;
