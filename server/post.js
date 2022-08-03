   async function post(fastify, options){
    
    fastify.post('/insert', async (request, reply) => {
const collection = fastify.mongo.db.collection('test_collection');
        const res = await collection.insert(
            request.body
        );
        return res;
    })

    }

    module.exports = post