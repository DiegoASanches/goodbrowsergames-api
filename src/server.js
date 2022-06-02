const express = require("express");
const db = require("./database/config");
var cors = require('cors');
const mongoose = require("mongoose");

class App {
  constructor() {
    this.express = express();

    this.express.use(cors());

    this.database();
    this.middlewares();
    this.routes();
    
    this.express.listen(3001, () =>
      console.log(`Sua API REST está funcionando na porta 3001 `)
    );

    console.log(process.env)
  }

  database() {
    mongoose.connect(db.uri, { useNewUrlParser: true });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}
module.exports = new App().express;