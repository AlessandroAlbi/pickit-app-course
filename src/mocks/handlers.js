// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
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
