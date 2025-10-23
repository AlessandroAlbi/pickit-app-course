// src/mocks/handlers.js
import { http, HttpResponse, graphql } from 'msw';

export const handlers = [
  // GraphQL handler for GET_ORDERS query
  graphql.query('GetOrders', () => {
    return HttpResponse.json({
      data: {
        orders: [
          {
            id: '1',
            order: 'ORD-001',
            status: 'pending',
            total: 299.99,
            date: '2025-10-20T10:30:00Z',
            customer: {
              name: 'Alice Johnson',
              email: 'alice.johnson@example.com',
              phoneNumber: '+1 (555) 123-4567',
            },
          },
          {
            id: '2',
            order: 'ORD-002',
            status: 'completed',
            total: 549.50,
            date: '2025-10-21T14:15:00Z',
            customer: {
              name: 'Bob Smith',
              email: 'bob.smith@example.com',
              phoneNumber: '+1 (555) 234-5678',
            },
          },
          {
            id: '3',
            order: 'ORD-003',
            status: 'shipped',
            total: 125.00,
            date: '2025-10-22T09:45:00Z',
            customer: {
              name: 'Carol Davis',
              email: 'carol.davis@example.com',
              phoneNumber: '+1 (555) 345-6789',
            },
          },
        ],
      },
    });
  }),

  // GraphQL handler for DELETE_ORDER mutation
  graphql.mutation('DeleteOrder', () => {
    return HttpResponse.json({
      data: {
        deleteOrder: true,
      },
    });
  }),

  http.get('https://api.example.com/account', async () => {
    // Simulate successful update by returning the updated data
    return HttpResponse.json(
      {
        success: true,
        data: {
          id: 'abc-123',
          firstName: 'John',
          lastName: 'Maverick',
          email: 'john.maverick@example.com',
          phone: '+1 (555) 987-6543',
          company: 'Acme Corp',
          role: 'Senior Software Engineer',
          bio: 'Passionate developer with 8+ years of experience in React and Node.js.',
        },
      },
      { status: 200 },
    );
  }),

  http.put('https://api.example.com/account', async ({ request }) => {
    const body = await request.json();

    // Simulate successful update by returning the updated data
    return HttpResponse.json(
      {
        success: true,
        message: 'Account updated successfully',
        data: {
          ...body,
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  }),
];
