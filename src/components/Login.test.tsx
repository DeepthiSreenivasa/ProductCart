import { render, screen } from '@testing-library/react';
import Login from './Login';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { use } from 'react';

describe('Login', () => {
  it('renders the login form', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors when required fields are empty', async () => {
    const user = userEvent.setup();

    render(<Login />);

    let element = screen.getByRole('button', { name: /sign in/i });
    await user.click(element);
    expect(await screen.findByText('Username is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('submits valid credentials', async () => {
    const user = userEvent.setup();

    const mockOnSubmit = vi.fn();

    render(<Login onSubmit={mockOnSubmit} />);

    let userNameField = screen.getByRole('textbox', { name: /user name/i });
    await user.type(userNameField, 'Jhon');

    let userPasswordField = screen.getByLabelText(/password/i);
    await user.type(userPasswordField, 'password');

    let submitButton = screen.getByRole('button', { name: /Sign in/i });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: 'Jhon',
      password: 'password',
    });
  });

  it('does not log console with passwords', async () => {
    let user = userEvent.setup();

    const consoleSpy = vi.spyOn(console, 'log');
    render(<Login />);

    let userNameField = screen.getByRole('textbox', { name: /user name/i });
    await user.type(userNameField, 'Jhon');

    let passwordField = screen.getByLabelText(/password/i);
    await user.type(passwordField, 'password');

    let submitButton = screen.getByRole('button', {
      name: /sign in/i,
    });
    await user.click(submitButton);

    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('Secret123'));
    consoleSpy.mockRestore();
  });

  //Accessibility Tests

  it('provides accessible labels for form controls', async () => {
    const user = userEvent.setup();

    render(<Login />);
    let element = screen.getByRole('button', { name: /sign in/i });
    await user.click(element);
    screen.debug;

    let userNameField = screen.getByRole('textbox', { name: /user name/i });
    expect(userNameField).toBeInTheDocument();
    expect(userNameField).toHaveAttribute('aria-invalid', 'true');
    expect(userNameField).toHaveAttribute('aria-describedby');

    let passwordField = screen.getByLabelText(/password/i);
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute('aria-invalid', 'true');
    expect(passwordField).toHaveAttribute('aria-describedby');
  });
});
