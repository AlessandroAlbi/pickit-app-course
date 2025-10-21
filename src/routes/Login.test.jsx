import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import Login from './Login';

// Mock di useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login component render', () => {
  beforeEach(() => {
    // Renderizza il componente prima di ogni test
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    // Reset dei mock prima di ogni test
    mockNavigate.mockReset();
  });

  it('should render basic elements', () => {
    // Verifica che tutti gli elementi del form di login siano presenti
    expect(
      screen.getByRole('heading', { name: /welcome back!/i }),
    ).toBeInTheDocument(); // Regex case insensitive
    expect(
      screen.getByRole('heading', { name: 'Welcome back!' }),
    ).toBeInTheDocument(); // Exact match

    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('should render login form basic elements', () => {
    // Verifica che tutti gli elementi del form di login siano presenti
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Login to your account/i }),
    ).toBeInTheDocument();
  });

  it('email autofocus on load', () => {
    // Verifica che il campo email abbia l'autofocus
    expect(screen.getByLabelText('Email Address')).toHaveFocus();
  });

  it('toggle password visibility', async () => {
    const user = userEvent.setup();
    const toggle = screen.getByRole('button', { name: /show password/i });
    const password = screen.getByLabelText('Password');

    expect(password.type).toBe('password');
    await user.click(toggle);
    expect(password.type).toBe('text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /hide password/i }));
    expect(password.type).toBe('password');
  });

    it('should show alert on invalid login', async () => {
    const user = userEvent.setup();
    const email = screen.getByLabelText('Email Address');
    const password = screen.getByLabelText('Password');
    const submit = screen.getByRole('button', { name: /Login to your account/i });

    await user.type(email, 'wrong@example.com');
    await user.type(password, 'nope');
    await user.click(submit);

    expect(screen.getByRole('alert')).toHaveTextContent(/invalid email or password/i);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should navigate to dashboard on valid login', async () => {
    const user = userEvent.setup();
    const email = screen.getByLabelText('Email Address');
    const password = screen.getByLabelText('Password');
    const submit = screen.getByRole('button', { name: /Login to your account/i });
    
    await user.type(email, 'user@example.com');
    await user.type(password, 'password123');
    await user.click(submit);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('should navigate to dashboard on valid login (enter key)', async () => {
    const user = userEvent.setup();
    const email = screen.getByLabelText('Email Address');
    const password = screen.getByLabelText('Password');
    
    await user.type(email, 'user@example.com');
    await user.type(password, 'password123');
    await user.keyboard('{Enter}');
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
