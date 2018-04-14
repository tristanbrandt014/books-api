import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import bodyParser = require("body-parser");
import express = require("express");
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { schema } from "./schema";
import cors = require("cors");

const app = express();
app.use(cors());
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: "ws://localhost:3005/subscriptions",
  }),
);

const ws = createServer(app);

ws.listen(3005, () => {
  console.log("Graphql API running at port " + 3005);
  new SubscriptionServer(
    {
      execute,
      schema,
      subscribe,
    },
    {
      path: "/subscriptions",
      server: ws,
    },
  );
});
