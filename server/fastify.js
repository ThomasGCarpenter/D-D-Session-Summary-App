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

fastify.get('/addstory', async (request, reply) => {
  const usersAnswers = fastify.mongo.client.db('mydb').collection('answers')

  let answers
  try {
    answers = await usersAnswers.find({}).toArray()
    console.log(answers)
  } catch (err) {
    console.log(err)
  }

  // Data to send to the client
  return {
    message: 'Test route successfully hit!',
    whatever: 'can go here',
    users
  }
})

fastify.post('/addstory', async (request, reply) => {
  // Changed users to answers
  const answersCollection = fastify.mongo.client.db('mydb').collection('answers')
  
  const answerDocument = { answer: request.body.answer }

  try {
    // request.body is not the array of documents that the server error message says needs to be passed into the 'insertMany' call.

    // insertOne apit expects one object as the argument to insert into Mongo
    await answersCollection.insertOne(answerDocument)

    // To use insertMany, you need to pass in an array. Notice how the answerDocument
    // object is wrapped in [], meaning it's an array with 1 item.
    //await answersCollection.insertMany([answerDocument])

    return { code: 200, message: 'Adding answer succeeded' }
   } catch(err){
    console.log(err)
    return { code: 500, message: 'Adding answer failed' }
   }
})

const start = async () => {
  try {
    await fastify.listen({ port: 9444  })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
