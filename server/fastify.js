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
  
  try {
    // let title = await usersAnswers.find({answer: 'Evil'}).toArray()
    var answers = await usersAnswers.find({}).toArray();
    console.log('TITLE HERE', answers)
  } catch (err) {
    console.log(err)
  }

  return {
    answers
  }
})

fastify.post('/addstory', async (request, reply) => {
  const answersCollection = fastify.mongo.client.db('mydb').collection('answers')
  const answerDocument = { answer: request.body.answer }

  try {
    await answersCollection.insertOne(answerDocument)
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
