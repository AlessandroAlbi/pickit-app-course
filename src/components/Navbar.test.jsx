import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Navbar from './Navbar';

// Mock di Account Modal (to avoid too many files open)
vi.mock('./AccountModal', () => {
  return {
    __esModule: true,
    default: ({ open, onClose }) => {
      if (!open) return null;
      return (
        <div role="dialog">
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

// Mock della funzione setFeature
const setFeatureMock = vi.fn();

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
    setFeatureMock.mockReset();
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

  it('should open account modal on account click', async () => {
    const user = userEvent.setup();

    // Apro il menu utente
    const userMenuButton = screen.getByLabelText('user-avatar');
    await user.click(userMenuButton);

    // Clicco su Account
    const accountOption = screen.getByRole('menuitem', { name: 'Account' });
    await user.click(accountOption);

    // Verifico che la modal sia aperta
    // Può sembrare di non star testando qualcosa di vero, ma in realtà il comportamento è al 100% quello reale
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

describe('Click on navbar pages', () => {
  beforeEach(async () => {
    // Renderizza il componente prima di ogni test
    render(
      <MemoryRouter>
        <Navbar setFeature={setFeatureMock} />
      </MemoryRouter>,
    );
  });

  it('should call setFeature on desktop button click', async () => {
    const user = userEvent.setup();
    
    // Reset del mock prima del test
    setFeatureMock.mockReset();
    
    // Clicco su un pulsante della navbar (versione desktop)
    // Nota: questi sono i pulsanti che non sono nel menu mobile
    const homeButton = screen.getByRole('button', { name: 'Home' });
    await user.click(homeButton);
    
    // Verifico che setFeature sia stata chiamata
    expect(setFeatureMock).toHaveBeenCalledWith('Home');
    expect(setFeatureMock).toHaveBeenCalledTimes(1);
  });
});