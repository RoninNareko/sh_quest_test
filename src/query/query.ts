import { gql } from "@apollo/client";

export const GET_RELATIONS = gql`
  query {
    applicantIndividualCompanyRelations {
      data {
        id
        name
      }
    }
  }
`;

export const GET_POSITIONS = gql`
  query {
    applicantIndividualCompanyPositions {
      data {
        id
        name
      }
    }
  }
`;
