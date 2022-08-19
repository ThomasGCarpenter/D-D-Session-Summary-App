import Fastify from 'fastify'
import MongoDBPlugin from '@fastify/mongodb'
import cors from '@fastify/cors'
import { ObjectID } from 'bson'

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

fastify.get('/campaigns/addsession', async (request, reply) => {
  const campaignSession = fastify.mongo.client.db('mydb').collection('sessionData')
  
  try {
    var sessionData = await campaignSession.find({}).toArray();
    console.log('TITLE HERE', sessionData)
  } catch (err) {
    console.log(err)
  }

  return {
    sessionData
  }
})

fastify.get('/campaigns/create', async (request, reply) => {
  const userCampaign = fastify.mongo.client.db('mydb').collection('campaign')
  
  try {
    // let title = await usersAnswers.find({answer: 'Evil'}).toArray()
    var result = await userCampaign.find({}).toArray();
    console.log('TITLE HERE', result)
  } catch (err) {
    console.log(err)
  }

  return {
    result
  }
})

// fastify.get('/campaigns/viewSessions/:id', (request, reply) => {
//   const myId = fastify.mongo.client.db('mydb').collection('campaign')
//   try {
//     var id =  myId.find({ id: request.params.id }).toString()
    
//     console.log('ID HERE!!!!!!!!!!', id)
//   } catch(err) {
//     console.log(err)
//   }

//   return {
//     id
//   }

  
// })

//TODO: change addstory to sessions/add; 
fastify.post('/campaigns/addsession', async (request, reply) => {
  const sessionDataCollection = fastify.mongo.client.db('mydb').collection('sessionData')
  const sessionDataDocument = { 
      title: request.body.title, 
      date: request.body.date,
      characters: request.body.characters,
      knowledge: request.body.knowledge,
      moments: request.body.moments 
    }

  try {
    await sessionDataCollection.insertOne(sessionDataDocument)
    return { code: 200, message: 'Adding answer succeeded' }
   } catch(err){
    console.log(err)
    return { code: 500, message: 'Adding answer failed' }
   }
})

fastify.post('/campaigns/create', async (request, reply) => {
  const campaignsCollection = fastify.mongo.client.db('mydb').collection('campaign')
  const campaignDataModel = { 
    title: request.body.title, 
    players: request.body.players, 
    startDate: request.body.startDate,
    description: request.body.description
  }

  try {
    await campaignsCollection.insertOne(campaignDataModel)
    return { code: 200, message: 'Adding campaignDataModel succeeded' }
   } catch(err){
    console.log(err)
    return { code: 500, message: 'Adding campaignDataModel failed' }
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
