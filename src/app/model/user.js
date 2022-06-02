const mongoose = require("mongoose");

var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {unique:true}
    },
    password:{
      type: String,
      required: true,
    },
    salt:{
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', function(next) {
  var user = this;


  if (!user.isModified('password')) return next();


  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);


      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.salt = salt;
          user.password = hash;
          next();
      });
  });
});

UserSchema.pre('findOneAndUpdate', function(next) {
 
  var query = this
  if (!query._update.password) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  if (err) return next(err);
    bcrypt.hash(query._update.password, process.env.TOKEN_SECRET, function(err, hash) {
      if (err) return next(err);
      query._update.salt= salt;
      query._update.password= hash;
      next();
    });
  });
});



UserSchema.methods.comparePassword = function(password,hash, callback) {
  bcrypt.compare(password, hash, function(error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
};



module.exports = mongoose.model("User", UserSchema);