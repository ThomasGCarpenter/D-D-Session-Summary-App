import Fastify from 'fastify'
import MongoDBPlugin from '@fastify/mongodb'
import cors from '@fastify/cors'
import { ObjectId } from 'mongodb'

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

//**************************************************************************************************** */
fastify.get('/campaigns/create', async (request, reply) => {
  const userCampaign = fastify.mongo.client.db('mydb').collection('campaign')
    try {
      var campaignData = await userCampaign.find({}).toArray();
      console.log('TITLE HERE', campaignData)
  } catch (err) {
      console.log(err)
  } return {
      campaignData
  }
})

fastify.get('/campaigns/addsession', async (request, reply) => {
  const campaignSession = fastify.mongo.client.db('mydb').collection('sessionData')
    try {
      var sessionData = await campaignSession.find({}).toArray();
      console.log('TITLE HERE', sessionData)
  } catch (err) {
      console.log(err)
  } return {
      sessionData
  }
})

fastify.get('/campaigns/:id/edit', async (request, reply) => {
  const userCampaign = fastify.mongo.client.db('mydb').collection('campaign')
    try {
      var editCampaign = await userCampaign.find({ _id: ObjectId(request.params.id) }).toArray();
      
      console.log('LOOOOOOOOOOOOOOOOOOOOK HEEEEEEEEEEEEEERE', editCampaign)
  } catch (err) {
      console.log(err)
  } return {
      editCampaign
  }
})

fastify.get('/campaigns/:id/sessions', async (request, reply) => {
  const viewSession = fastify.mongo.client.db('mydb').collection('sessionData')
    try {
      var sessionData =  await viewSession.find({ session_id: ObjectId(request.params.id) }).toArray();
      console.log(request)
      console.log('ID HERE!!!!!!!!!!', sessionData)
  } catch(err) {
      console.log(err)
  } return {
      sessionData
  }
})

fastify.get('/campaigns/:sessionid/session/:id', async (request, reply) => {
  const mySession = fastify.mongo.client.db('mydb').collection('sessionData')
    try {
      var sessionData = await mySession.find({ _id: ObjectId(request.params.id) }).toArray();
      console.log(request)
      console.log('HEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOO', sessionData)
    } catch(err) {
      console.log(err)
    } return {
      sessionData
    }
})

//**************************************************************************************************** */
fastify.post('/campaigns/:id/addsession', async (request, reply) => {
  const sessionDataCollection = fastify.mongo.client.db('mydb').collection('sessionData')
  const sessionDataDocument = { 
      session_id:  ObjectId(request.params.id),
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

//**************************************************************************************************** */
fastify.put('/campaigns/:id/edit', async (request, reply) => {
  const campaignEdit = fastify.mongo.client.db('mydb').collection('campaign')

  try {
    await campaignEdit.findOneAndUpdate({ _id: ObjectId(request.params.id) }, { 
      title: request.body.title, 
      players: request.body.players, 
      startDate: request.body.startDate,
      description: request.body.description
    
    }, {returnOriginal:false})
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
