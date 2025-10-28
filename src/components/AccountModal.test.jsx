import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AccountModal from './AccountModal';

const onCloseMock = vi.fn();

describe('AccountModal Component', () => {
  beforeEach(() => {
    onCloseMock.mockClear();
  });

  // Test 3: Check the fetch of the data
  it('should fetch and display account data when modal opens', async () => {
    render(<AccountModal open={true} onClose={onCloseMock} />);

    // Initially should show loading spinner
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Verify that the fetched data is displayed
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);
    const emailField = screen.getByLabelText(/email/i);
    const phoneField = screen.getByLabelText(/phone/i);
    const companyField = screen.getByLabelText(/company/i);
    const roleField = screen.getByLabelText(/role/i);
    const bioField = screen.getByLabelText(/bio/i);

    expect(firstNameField).toHaveValue('John');
    expect(lastNameField).toHaveValue('Maverick');
    expect(emailField).toHaveValue('john.maverick@example.com');
    expect(phoneField).toHaveValue('+1 (555) 987-6543');
    expect(companyField).toHaveValue('Acme Corp');
    expect(roleField).toHaveValue('Senior Software Engineer');
    expect(bioField).toHaveValue(
      'Passionate developer with 8+ years of experience in React and Node.js.',
    );
  });

  it('should handle fetch error gracefully', async () => {
    // Import MSW server to override the handler for this test
    const { server } = await import('../mocks/server');
    const { http, HttpResponse } = await import('msw');

    // Override the handler to simulate a failed request
    server.use(
      http.get('https://api.example.com/account', () => {
        return HttpResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 },
        );
      }),
    );

    // Spy on console.error to verify error handling
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<AccountModal open={true} onClose={onCloseMock} />);

    // Initially should show loading spinner
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Verify that console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching account data:',
      expect.any(Error),
    );

    // Fields should be empty or with default values
    const firstNameField = screen.getByLabelText(/first name/i);
    const lastNameField = screen.getByLabelText(/last name/i);

    expect(firstNameField).toHaveValue('');
    expect(lastNameField).toHaveValue('');

    // Cleanup
    consoleErrorSpy.mockRestore();
  });
});
