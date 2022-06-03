const Category = require("../model/category");

class CategoryController {
    async store(req, res) {
        const data = await Category.create(req.body);

        return res.json(data);
    }
    async index(req, res) {
        const data = await Category.find({});
        const result = {
            results: data,
            total_results: data.length,
        };

        return res.json(result);
    }
    async update(req, res) {
        const data = await Category.findByIdAndUpdate(req.body._id, req.body, { new: true, upsert: true });
        return res.json(data);
    }
}

module.exports = new CategoryController();