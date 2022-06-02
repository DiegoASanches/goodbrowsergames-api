const express = require("express");
const routes = express.Router();
const TokenHandler = require("./app/middleware/TokenHandler");
const path = require('path');


require('dotenv').config({path:`${__dirname}/prod.env`});

routes.get("/", function(req, res) {
  return res.send("Minha primeira rota!");
});


const UserController = require("./app/controller/UserController");
const RoleController = require("./app/controller/RoleController");
const GameController = require("./app/controller/GameController");
var TKH = new TokenHandler();
routes.post("/login", UserController.login);

routes.get("/user",TKH.verifyJWT,TKH.roleChecker, UserController.index);
routes.post("/user", UserController.store);
routes.put("/user", UserController.update);


routes.get("/role",TKH.verifyJWT, RoleController.index);
routes.post("/role",TKH.verifyJWT,TKH.roleChecker, RoleController.store);

routes.get("/game", GameController.index);
routes.post("/game",TKH.verifyJWT,TKH.roleChecker, GameController.store);
routes.put("/game",TKH.verifyJWT,TKH.roleChecker, GameController.update);
routes.get("/myGames", GameController.getMyGames);

module.exports = routes;