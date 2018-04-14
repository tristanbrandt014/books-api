import * as _ from "lodash";
import { Schema } from "./../types/schema";

export interface RootType {
  schema: string[];
  resolvers: {
    [fieldName: string]: () => any;
  };
}

export const getRootType = (
  schemaMap: Schema,
  type: "queries" | "mutations",
): RootType =>
  _.keys(schemaMap).reduce(
    (rootType, key) => {
      const obj = schemaMap[key][type];
      if (typeof obj !== "undefined" && obj._schema) {
        rootType.schema.push(obj._schema);
        rootType.resolvers = {
          ...rootType.resolvers,
          ..._.omit(obj, "_schema"),
        };
      }
      return rootType;
    },
    { schema: [], resolvers: {} },
  );
