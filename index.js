const fastify = require('fastify')({ logger: false })
const fs = require('fs')
const Fuse = require('fuse.js')
// request.query.q
fastify.get('/', async (request, reply) => {
  return { error: 'Please use a correct api route.', success: false }
}
)
fastify.get('/query', async (request, reply) => {
  const options = {
    includeScore: true,
    keys: ['name', 'alias']
  }
  const list = await fs.readFile("./storage/data.json", 'utf8', (err, data) => {
    const fuse = new Fuse(JSON.parse(data), options)
    const result = fuse.search(request.query.q)
    reply.send(result)
  })
})

const start = async () => {
  try {
    await fastify.listen(3000)
    console.log(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
