const Evaluation = require("../model/evaluation");

class EvaluationController {
    async store(req, res) {
        const data = await Evaluation.create(req.body);

        return res.json(data);
    }
    async index(req, res) {
        const data = await Evaluation.find({});
        const result = {
            results: data,
            total_results: data.length,
        };

        return res.json(result);
    }
    async update(req, res) {
        const data = await Evaluation.findByIdAndUpdate(req.body._id, req.body, { new: true, upsert: true });
        return res.json(data);
    }
}

module.exports = new EvaluationController();