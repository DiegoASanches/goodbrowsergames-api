const Role = require("../model/role");

class RoleController {
  async store(req, res) {
    const role = await Role.create(req.body);

    return res.json(role);
  }

  async index(req, res) {
    const data = await Role.find({});

    return res.json(data);
  }

}



module.exports = new RoleController();