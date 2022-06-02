const Game = require("../model/game");

class GameController {
    async store(req, res) {
        const data = await Game.create(req.body);

        return res.json(data);
    }
    async index(req, res) {
        const data = await Game.find({});

        return res.json(data);
    }
    async update(req, res) {
        const data = await Game.findByIdAndUpdate(req.body._id, req.body, { new: true, upsert: true });
        return res.json(data);
    }
}

module.exports = new GameController();