const jwt = require('jsonwebtoken');

const fs = require("fs");
   
// Read users.json file


class TokenHandler{
  verifyJWT(req, res, next){
      
      const token = req.body.token || req.query.token || req.headers["x-access-token"];
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
      
      jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        req.userRoles = decoded.roles;
        next();
      });
    }

  async roleChecker(req, res, next){ //confere se usuário tem permissão baseado no path e metodo (cofere no banco de dados!)
      var found = false;
      fs.readFile("src/app/middleware/rolesList.json", function(err, data) {
        console.log(data);
        // Check for errors
        if (err) throw err;
       
        // Converting to JSON
        const roles = JSON.parse(data);
        roles.paths.forEach((r)=>{
          if(req.method == r.method & req.path == r.path & ((r.reqrole.includes("Public"))|| req.userRoles.map(a => a.name).some(item =>r.reqrole.includes(item)) ))  found = true
        })
        
        if(found){
             next();
        }
        else{
          return res.status(401).send({ auth: false, message: 'No permission.' });
        }
        
    });

  }


}

  module.exports = TokenHandler

  