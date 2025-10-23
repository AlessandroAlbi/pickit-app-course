import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from './Home';

describe('Home component render', () => {
  beforeEach(() => {
    // Render the component before each test
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  });

  it('should render basic elements', () => {
    // Verify that the Home heading is present
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument(); // Exact match
  });

  it('should render orders fetched from API', async () => {
    // Verify that the orders are rendered
    expect(await screen.findByText('Order ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Status: pending')).toBeInTheDocument();
    expect(screen.getByText('Total: $299.99')).toBeInTheDocument();
  });

  it('should delete an order when delete button is clicked', async () => {
    const user = userEvent.setup();

    // Ensure the order is present before deletion
    const orderElement = await screen.findByText('Order ID: 1');
    expect(orderElement).toBeInTheDocument();

    // Click the delete button for the order
    const deleteButton = screen.getByRole('button', { name: /Delete order 1/i });
    await user.click(deleteButton);

    // Verify the order is removed from the document
    expect(screen.queryByText('Order ID: 1')).not.toBeInTheDocument();
  });
});
