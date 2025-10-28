import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from './Home';

describe('Home component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  });

  it('should render orders from graphql', async () => {
    expect(await screen.findByText('Order ID: 1')).toBeInTheDocument();
  });

  it('should delete an order when delete button is clicked', async () => {
    const user = userEvent.setup();

    const orderElement = await screen.findByText('Order ID: 1');
    expect(orderElement).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', {
      name: /delete order 1/i,
    });
    await user.click(deleteButton);

    expect(orderElement).not.toBeInTheDocument();
  });
});
