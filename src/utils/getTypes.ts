import * as _ from "lodash";
import { Schema } from "./../types/schema";

export interface GraphQLType {
  schema: string[];
  resolvers: {
    [typeName: string]: {
      [fieldName: string]: () => any;
    };
  };
}

export const getTypes = (schemaMap: Schema): GraphQLType =>
  _.keys(schemaMap).reduce(
    (types, key) => {
      const obj = schemaMap[key];
      if (obj.types) {
        types.schema = [
          ...types.schema,
          ..._.keys(obj.types).map(oType => obj.types[oType]._schema),
        ];
        types.resolvers = {
          ...types.resolvers,
          ..._.keys(obj.types).reduce((oTypes, oType) => {
            oTypes[oType] = _.omit(obj.types[oType], "_schema");
            return oTypes;
          }, {}),
        };
      }
      return types;
    },
    { schema: [], resolvers: {} },
  );
