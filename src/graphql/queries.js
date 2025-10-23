import { gql } from '@apollo/client/core';

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      date
      id
      order
      status
      total
      customer {
        email
        name
        phoneNumber
      }
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: Int!) {
    deleteOrder(id: $id)
  }
`;
