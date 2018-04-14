import { gql } from "./../../utils/gql";
import rp = require("request-promise");
import { get } from "lodash";

const API_KEY = process.env.API_KEY || "";
const uri = "https://www.googleapis.com/books/v1/volumes";

export const Query = gql`
  extend type Query {
    books(search: String!, offset: Int, maxResults: Int): [Book]
  }
`;

Query.books = async (root, params, context) => {
  const options = {
    uri,
    qs: {
      q: params.search,
      key: API_KEY,
      maxResults: get(params, "maxResults", 10),
      startIndex: get(params, "offset", 0)
    },
    json: true,
  };
  const result = await rp(options);
  return result.items;
};
