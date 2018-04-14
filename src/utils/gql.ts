export const gql = (schema: any) => {
  const resolversWithSchema: {
    [key: string]: any;
  } = {
    _schema: schema.raw[0],
  };
  return resolversWithSchema;
};
