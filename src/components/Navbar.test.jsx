import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Navbar from './Navbar';

vi.mock('./AccountModal', () => {
  return {
    __esModule: true,
    default: ({ open, onClose }) => {
      if (!open) return null;
      return (
        <div role='dialog'>
          <h2>Account Modal</h2>
          <button onClick={onClose}>Close</button>
        </div>
      );
    },
  };
});

// Mock di useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Render basic navbar component', () => {
  beforeEach(() => {
    // Renderizza il componente prima di ogni test
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    // Reset dei mock prima di ogni test
    mockNavigate.mockReset();
  });

  it('should find a logo in the navbar', () => {
    const logos = screen.getAllByLabelText('logo');
    expect(logos).toHaveLength(2);

    expect(logos[1]).toBeVisible();
  });

  it('should open account modal on click', async () => {
    const user = userEvent.setup();

    const userModalButton = screen.getByLabelText('user-avatar');
    await user.click(userModalButton);

    // Verifica che ci sia Account nel menu a comparsa
    expect(
      screen.getByRole('menuitem', { name: 'Account' }),
    ).toBeInTheDocument();

    const accountOption = screen.getByRole('menuitem', { name: 'Account' });
    await user.click(accountOption);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('Open and close nav menu', () => {
  beforeEach(async () => {
    // Renderizza il componente prima di ogni test
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Apro il menu di navigazione
    const user = userEvent.setup();
    const navMenuButton = screen.getByLabelText('hamburger-menu');
    await user.click(navMenuButton);
    // Verifico che il menu sia aperto
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should close nav menu on escape', async () => {
    const user = userEvent.setup();

    // Chiudo il menu di navigazione via Esc
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});
