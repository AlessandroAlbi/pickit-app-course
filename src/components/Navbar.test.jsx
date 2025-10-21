import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Navbar from './Navbar';

// Mock di useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar Component render', () => {
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

  it('should render basic elements', () => {
    // Verifica che tutti gli elementi base della Navbar siano presenti

    // Verifico che ce ne siano 2
    // Potevamo fare anche dare due aria-label diversi (logo-desktop e logo-mobile)
    const logos = screen.getAllByLabelText('logo');
    expect(logos).toHaveLength(2);

    // Alternativa
    expect(logos[0]).toBeInTheDocument();

    // Alternativa
    expect(screen.getAllByLabelText(/logo/i).length).toBeGreaterThan(0);
  });

  it('should navigate to login on logout click', async () => {
    const user = userEvent.setup();

    // Apro il menu utente
    const userMenuButton = screen.getByLabelText('user-avatar');
    await user.click(userMenuButton);

    // Clicco su Logout
    const logoutOption = screen.getByRole('menuitem', { name: 'Logout' });
    await user.click(logoutOption);
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
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
