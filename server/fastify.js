import Fastify from "fastify";
import MongoDBPlugin from "@fastify/mongodb";
import cors from "@fastify/cors";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import fastifyEnv from "@fastify/env";
import jwt from "@fastify/jwt";
import multer from "fastify-multer";

const upload = multer({ dest: "uploads/" });

const fastify = Fastify({ logger: true });
await fastify.register(cors, {
  // put your options here
});
fastify.register(MongoDBPlugin, {
  forceClose: true,
  url: "mongodb://127.0.0.1/mydb",
});

fastify.addContentTypeParser(
  "application/jsoff",
  function (request, payload, done) {
    jsoffParser(payload, function (err, body) {
      done(err, body);
    });
  }
);

fastify.register(jwt, {
  secret: "process.env.SECRET_KEY",
});

const schema = {
  type: "object",
  required: ["SECRET_KEY"],
  properties: {
    SECRET_KEY: {
      type: "string",
    },
  },
};

const options = {
  confKey: "config",
  dotenv: true,
  schema: schema,
  data: process.env,
};

fastify.register(fastifyEnv, options).ready((err) => {
  if (err) console.error(err);
  console.log(fastify.config);
});

// const server = fastify();
const server = Fastify();
// register fastify content parser
server.register(multer.contentParser);

//**************************************************************************************************** */
fastify.get("/campaigns/create", async (request, reply) => {
  const userCampaign = fastify.mongo.client.db("mydb").collection("campaign");
  try {
    var campaignData = await userCampaign.find({}).toArray();
    console.log("TITLE HERE", campaignData);
  } catch (err) {
    console.log(err);
  }
  return {
    campaignData,
  };
});

fastify.get("/campaigns/addsession", async (request, reply) => {
  const campaignSession = fastify.mongo.client
    .db("mydb")
    .collection("sessionData");
  try {
    var sessionData = await campaignSession.find({}).toArray();
    console.log("TITLE HERE", sessionData);
  } catch (err) {
    console.log(err);
  }
  return {
    sessionData,
  };
});

fastify.get("/campaigns/:id/edit", async (request, reply) => {
  const userCampaign = fastify.mongo.client.db("mydb").collection("campaign");
  try {
    var editCampaign = await userCampaign
      .find({ _id: ObjectId(request.params.id) })
      .toArray();

    console.log("LOOOOOOOOOOOOOOOOOOOOK HEEEEEEEEEEEEEERE", editCampaign);
  } catch (err) {
    console.log(err);
  }
  return {
    editCampaign,
  };
});

fastify.get("/campaigns/:sessionid/edit/:id", async (request, reply) => {
  const userCampaign = fastify.mongo.client
    .db("mydb")
    .collection("sessionData");
  try {
    console.log(request.params);
    var editSession = await userCampaign
      .find({ _id: ObjectId(request.params.id) })
      .toArray();

    console.log("LOOOOOOOOOOOOOOOOOOOOK HEEEEEEEEEEEEEERE", editSession);
  } catch (err) {
    console.log(err);
    console.log(editSession);
  }
  return {
    editSession,
  };
});

fastify.get("/campaigns/:id/sessions", async (request, reply) => {
  const viewSession = fastify.mongo.client.db("mydb").collection("sessionData");
  try {
    var sessionData = await viewSession
      .find({ session_id: ObjectId(request.params.id) })
      .toArray();
    console.log(request);
    console.log("ID HERE!!!!!!!!!!", sessionData);
  } catch (err) {
    console.log(err);
  }
  return {
    sessionData,
  };
});

fastify.get("/campaigns/:sessionid/session/:id", async (request, reply) => {
  const mySession = fastify.mongo.client.db("mydb").collection("sessionData");
  try {
    var sessionData = await mySession
      .find({ _id: ObjectId(request.params.id) })
      .toArray();
    console.log(request);
    console.log("HEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOO", sessionData);
  } catch (err) {
    console.log(err);
  }
  return {
    sessionData,
  };
});

//**************************************************************************************************** */
//SAVE FILE UPLOAD
server.route({
  method: "POST",
  url: "/campaigns/upload",
  preHandler: upload.single("file"),
  handler: async function (request, reply) {
    const fileUploadCollection = fastify.mongo.client
      .db("mydb")
      .collection("file-uploads");
    const uploadedFile = {
      formData: request.file,
    };
    console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOK", uploadedFile);
    try {
      await fileUploadCollection.insertOne(uploadedFile);
      return { code: 200, message: "Adding file success" };
    } catch (err) {
      console.log(err);
      return { code: 500, message: "Adding file failed" };
    }
  },
});

fastify.post("/campaigns/:id/addsession", async (request, reply) => {
  const sessionDataCollection = fastify.mongo.client
    .db("mydb")
    .collection("sessionData");
  const sessionDataDocument = {
    session_id: ObjectId(request.params.id),
    title: request.body.title,
    date: request.body.date,
    characters: request.body.characters,
    knowledge: request.body.knowledge,
    moments: request.body.moments,
  };

  try {
    await sessionDataCollection.insertOne(sessionDataDocument);
    return { code: 200, message: "Adding answer succeeded" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "Adding answer failed" };
  }
});

fastify.post("/campaigns/create", async (request, reply) => {
  const campaignsCollection = fastify.mongo.client
    .db("mydb")
    .collection("campaign");
  const campaignDataModel = {
    title: request.body.title,
    players: request.body.players,
    dm: request.body.userObj.username,
    startDate: request.body.startDate,
    description: request.body.description,
    userId: request.body.userObj._id,
  };

  try {
    await campaignsCollection.insertOne(campaignDataModel);
    return { code: 200, message: "Adding campaignDataModel succeeded" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "Adding campaignDataModel failed" };
  }
});

fastify.post(
  "/signup",
  // {
  //   "$schema": {
  //     "body": {
  //       "type": 'object', "required": ['username', 'password'], "properties": {
  //         "username": { "type": 'string '},
  //         "password": { "type": 'string'}
  //       }
  //     }
  //   }
  // },

  async (request, reply) => {
    const userData = fastify.mongo.client.db("mydb").collection("userData");
    var passwordHash = request.body.password;
    const hashed = await bcrypt.hash(passwordHash, 12);
    const token = fastify.jwt.sign(request.body);

    const userDataModel = {
      username: request.body.username,
      password: hashed,
      token: token,
    };
    try {
      userData.insertOne(userDataModel);
      console.log;
      return console.log(userData);
    } catch (err) {
      console.log(err);
    }
    reply.send({ token });
  }
);

fastify.post("/login", async (request, reply) => {
  const user = fastify.mongo.client.db("mydb").collection("userData");

  try {
    const userFind = await user.findOne({ username: request.body.username });
    const isValidPassword = await bcrypt.compare(
      request.body.password.toString(),
      userFind.password
    );
    if (!isValidPassword) {
      console.log("password not match");
    } else if (isValidPassword) {
      console.log("SUCCCCCCCCESSSSSSSSSSSSSSs");
      return userFind;
    }
  } catch (err) {
    console.log(err);
    return { code: 500, message: "Login failed" };
  }
});

//**************************************************************************************************** */
fastify.put("/campaigns/:id/edit", async (request, reply) => {
  const campaignEdit = fastify.mongo.client.db("mydb").collection("campaign");

  try {
    await campaignEdit.findOneAndUpdate(
      { _id: ObjectId(request.params.id) },
      {
        $set: {
          title: request.body.title,
          players: request.body.players,
          startDate: request.body.startDate,
          description: request.body.description,
        },
      },
      { returnOriginal: false }
    );

    return { code: 200, message: "Adding campaignDataModel succeeded" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "Adding campaignDataModel failed" };
  }
});

fastify.put("/campaigns/join/:id", async (request, reply) => {
  const userUpdate = fastify.mongo.client.db("mydb").collection("userData");
  console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQ", request.body.userObj.username);
  try {
    await campaignEdit.findOneAndUpdate(
      { _id: ObjectId(request.params.id) },
      {
        $set: {
          userId: request.body.userObj._id,
        },
      },
      { returnOriginal: false }
    );

    return { code: 200, message: "Adding campaignDataModel succeeded" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "Adding campaignDataModel failed" };
  }
});

fastify.put("/campaigns/:sessionid/edit/:id", async (request, reply) => {
  const campaignEdit = fastify.mongo.client
    .db("mydb")
    .collection("sessionData");

  try {
    await campaignEdit.findOneAndUpdate(
      { _id: ObjectId(request.params.id) },
      {
        $set: {
          title: request.body.title,
          date: request.body.date,
          characters: request.body.characters,
          knowledge: request.body.knowledge,
          moments: request.body.moments,
        },
      },
      { returnOriginal: false }
    );

    return { code: 200, message: "Adding campaignDataModel succeeded" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "Adding campaignDataModel failed" };
  }
});
// **************************************************************************************************** */
fastify.delete("/campaigns/:id/delete", async (request, reply) => {
  const campaignDocuments = fastify.mongo.client
    .db("mydb")
    .collection("campaign");

  try {
    await campaignDocuments.deleteOne({ _id: ObjectId(request.params.id) });
    return { code: 200, message: "Delete Campaign succeeded" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "Delete Campaign failed" };
  }
});

fastify.delete("/campaigns/:sessionid/delete/:id", async (request, reply) => {
  const campaignDocuments = fastify.mongo.client
    .db("mydb")
    .collection("sessionData");

  try {
    await campaignDocuments.deleteOne({ _id: ObjectId(request.params.id) });
    return { code: 200, message: "Delete Campaign succeeded" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "Delete Campaign failed" };
  }
});
// **************************************************************************************************** */

const start = async () => {
  try {
    await fastify.listen({ port: 9444 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
