const Game = require("../model/game");
const Evaluation = require("../model/evaluation");

class GameController {
    async store(req, res) {
        const data = await Game.create(req.body);

        return res.json(data);
    }
    async index(req, res) {
        const data = await Game.find({});
        const result = {
            results: data,
            total_results: data.length,
        };

        return res.json(result);
    }
    async getOneGame(req, res) {
        const data = await Game.findById(req.params.id);
        const evaluations = await Evaluation.find({game: req.params.id});
        data.voteCount = Math.floor((evaluations.map(evaluation => evaluation.grade).reduce((partialSum, a) => Number(partialSum) + Number(a), 0))/evaluations.length);
        await Game.findByIdAndUpdate(req.params.id, {voteCount: data.voteCount});
        return res.json(data);
    }
    async getMyGames(req, res) {
        const data = await Game.find(req.body);
        const result = {
            results: data,
            total_results: data.length,
        };

        return res.json(result);
    }
    async update(req, res) {
        const data = await Game.findByIdAndUpdate(req.body._id, req.body, { new: true, upsert: true });
        return res.json(data);
    }
}

module.exports = new GameController();