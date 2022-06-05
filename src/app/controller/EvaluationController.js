const Evaluation = require("../model/evaluation");

class EvaluationController {
    async store(req, res) {
        const data = await Evaluation.create(req.body);

        return res.json(data);
    }
    async index(req, res) {
        const data = await Evaluation.find(req.query);
        const result = {
            results: data,
            total_results: data.length,
        };

        return res.json(result);
    }
    async update(req, res) {
        let data = await Evaluation.findOne({ game: req.body.game, user: req.body.user });
        if (!data) {
            data = await Evaluation.create(req.body);
        } else {
            data = await Evaluation.findByIdAndUpdate(data._id, req.body);
        }
        return res.json(data);
    }
}

module.exports = new EvaluationController();