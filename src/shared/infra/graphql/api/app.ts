/** @format */

// Import the framework and instantiate it
import { server } from '@config'

import Fastify from 'fastify'
import { ApolloServer, BaseContext } from '@apollo/server'
import fastifyApollo, {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from '@as-integrations/fastify'

import { readFileSync } from 'fs'
import path from 'path'
import { companyQueries } from '../../../../modules/company/infra/graphql/resolvers/queries'

const fastify = Fastify({
  logger: true,
})

const schema = readFileSync(
  path.resolve(
    __dirname,
    '../../../../shared/infra/graphql/schema/schema.graphql'
  ),
  'utf-8'
)

const queries = {
  getCompanies: () => {
    return companyQueries.getCompanies()
  },
}

const apollo = new ApolloServer<BaseContext>({
  typeDefs: schema,
  resolvers: {
    Query: queries,
  },
  plugins: [fastifyApolloDrainPlugin(fastify)],
})

const init = async () => {
  try {
    await apollo.start()
    await fastify.register(fastifyApollo(apollo))

    await fastify.listen({
      port: server.PORT,
    })
    fastify.log.info(
      `El servidor está corriendo en http://localhost:${server.PORT}/graphql`
    )
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

init()
