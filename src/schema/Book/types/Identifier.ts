import { gql } from "./../../../utils/gql";

export const Identifier = gql`
  type Identifier {
    type: String
    value: String
  }
`;

Identifier.type = (root, params, context) => {
  return root.type;
};

Identifier.value = (root, params, context) => {
  return root.identifier;
};
