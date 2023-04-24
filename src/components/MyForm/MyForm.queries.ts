import { gql } from "@apollo/client";

export const GET_POSITIONS_QUERY = gql`
  query companyPositions {
    applicantIndividualCompanyPositions {
      data {
        id
        name
      }
    }
  }
`;

export const GET_RELATIONS_QUERY = gql`
  query companyRelations {
    applicantIndividualCompanyRelations {
      data {
        id
        name
      }
    }
  }
`;
