import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import * as schemas from "./imports";
import { getRootType } from "./../utils/getRootType";
import { getTypes } from "./../utils/getTypes";

const queries = getRootType(schemas, "queries");
const mutations = getRootType(schemas, "mutations");
const types = getTypes(schemas);
const baseSchema = `
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        init: Boolean
    }

    type Mutation {
        init: Boolean
    }
`;

const baseResolvers = {
  Query: {
    init: () => true,
    ...queries.resolvers,
  },
  Mutation: {
    init: () => true,
    ...mutations.resolvers,
  },
};

const typeDefs = [
  baseSchema,
  ...queries.schema,
  ...mutations.schema,
  ...types.schema,
];

const resolvers = {
  ...baseResolvers,
  ...types.resolvers,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
