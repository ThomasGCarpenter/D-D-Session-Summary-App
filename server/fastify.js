import Fastify from 'fastify'
import MongoDBPlugin from '@fastify/mongodb'
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})
await fastify.register(cors, { 
  // put your options here
})
fastify.register(MongoDBPlugin, {
  forceClose: true,
  url: 'mongodb://127.0.0.1/mydb'
})
fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
  jsoffParser(payload, function (err, body) {
    done(err, body)
  })
})

// fastify.get('/test', async (request, reply) => {
//   const usersCollection = fastify.mongo.client.db('mydb').collection('users')

//   let users
//   try {
//     users = await usersCollection.find({}).toArray()
//     console.log(users)
//   } catch (err) {
//     console.log(err)
//   }

//   // Data to send to the client
//   return {
//     message: 'Test route successfully hit!',
//     whatever: 'can go here',
//     users
//   }
// })



fastify.post('/addstory', async (request, reply) => {
  const answersCollection = fastify.mongo.client.db('mydb').collection('users')
  let res 
  try{
    res = await answersCollection.insertMany(request.body)
   } catch(err){
    console.log(err)
   }
  
})

// fastify.post('/addstory', (req, reply) => {
//   reply.send(req.body)
// })

const start = async () => {
  try {
    await fastify.listen({ port: 9444  })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()