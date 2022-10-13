import fp from 'fastify-plugin'
import configuration from '../configuration'
import jwt from '@fastify/jwt'

export default fp(function (fastify, opts, done) {

    fastify.register((jwt), { 
        secret: configuration.secretKey 
      });

    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

    done()
})