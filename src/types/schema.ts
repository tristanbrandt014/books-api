export interface GraphQLObject {
  _schema: string;
  [resolver: string]: any;
}

export interface Schema {
  [type: string]: {
    queries?: any;
    mutations?: any;
    types: {
      [type: string]: any;
    };
  };
}
