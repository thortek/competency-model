const { nexusPrismaPlugin } = require('nexus-prisma')
const { idArg, makeSchema, objectType, stringArg } = require('nexus')
const { Query } = require('./query')
const { Models } = require('./nexusModels')


export const schema = makeSchema({
  types: [Query, ...Models],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
})
