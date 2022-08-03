const fastifyPlugin = require('fastify-plugin')

async function dbConnect(fastify, options){
    fastify.register(require('@fastify/mongodb'), {
        forceClose: true,
        
        url: 'mongodb://127.0.0.1:27017/mydb'
    })
}


module.exports = fastifyPlugin(dbConnect)



