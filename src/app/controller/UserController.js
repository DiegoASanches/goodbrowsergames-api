const User = require("../model/user");
const dotenv  = require ('dotenv')
var jwt = require('jsonwebtoken');

class UserController {
  async store(req, res) {
    const data = await User.create(req.body);

    return res.json(data);
  }
  async index(req, res) {
    const data = await User.find({});

    return res.json(data);
  }
  async update(req, res) {
    const data = await User.findByIdAndUpdate(req.body._id, req.body, { new: true, upsert: true });
    return res.json(data);
  }

  async login(req, res) {
    const user = User.findOne({ "email":req.body.email }).populate('roles').exec(function (err, user) {
      if (err)   return res.status(401).json({"error":err});
      if (user == null) return res.status(401).json({"error":"login failed"});
      user.comparePassword(req.body.password,user.password, function (matchError, isMatch) {
        if (matchError) {
          callback({error: true})
        } else if (!isMatch) {
          return res.status(401).json({"error":"login failed"});
        } else {
          var token = jwt.sign({ "id":user._id, "roles":user.roles}, process.env.TOKEN_SECRET, {
            expiresIn: 600 // expira em 10 min
          });
          const result = {
            token,
            user,
          }
          return res.status(200).json(result);
        }
      });
    });

}
}


module.exports = new UserController();