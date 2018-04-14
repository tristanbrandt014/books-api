import { gql } from "./../../../utils/gql";
import { get } from "lodash";

export const Book = gql`
  type Book {
    name: String
    author: String
    identifier: Identifier
    image: String
  }
`;

Book.name = (root, params, context) => {
  return get(root, "volumeInfo.title");
};

Book.author = (root, params, context) => {
  return get(root, "volumeInfo.authors[0]");
};

Book.identifier = (root, params, context) => {
  return get(root, "volumeInfo.industryIdentifiers[0]");
};

Book.image = (root, params, context) => {
  return get(root, "volumeInfo.imageLinks.thumbnail");
};
