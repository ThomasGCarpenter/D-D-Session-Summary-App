// fastify.register(require('fastify-mongoose'), {
//   uri: 'mongodb://127.0.0.1:27017/mydb',

// })

// mongoose.connect(uri, { useNewUrlParser: true });
// mongoose.createConnection(uri, { useNewUrlParser: true });

// fastify.listen(3000, err => {
//   if (err) throw err
//   console.log(`server listening on ${fastify.server.address().port}`)
// })

const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    }
})

mongoose.connect(
 '',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to the mongodb");
  }
);

module.exports = mongoose.model("User", UserSchema);
