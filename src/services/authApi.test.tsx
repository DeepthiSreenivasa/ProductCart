import { delay, http, HttpResponse } from 'msw';
import { server } from '../test/mocks/server';
import loginUser from './authApi';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '../test/testUtilts';
import Login from '../components/Login';
import { screen, waitFor } from '@testing-library/react';

describe('Login API', () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  it('should make an successful API call', async () => {
    const user = await loginUser({
      username: 'emily',
      password: 'emilyspass',
    });

    expect(user).toEqual({
      id: 1,
      username: 'emily',
      email: 'emily@example.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      gender: 'female',
      image: 'https://example.com/emily.jpg',
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
    });
  });

  it('should display an error when API returns 401', async () => {
    const user = userEvent.setup();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    server.use(
      http.post(`${API_BASE_URL}/auth/login`, () => {
        return new HttpResponse(null, {
          status: 401,
        });
      }),
    );

    renderWithQueryClient(<Login />);

    const username = screen.getByRole('textbox', {
      name: /user name/i,
    });

    const password = screen.getByLabelText(/password/i);

    await user.type(username, 'wrong-user');
    await user.type(password, 'wrong-password');

    await user.click(
      screen.getByRole('button', {
        name: /sign in/i,
      }),
    );

    expect(await screen.findByText('Login Failed')).toBeInTheDocument();
  });

  it('sends the correct credentials to the login API', async () => {
    const user = userEvent.setup();

    let requestBody: unknown;

    server.use(
      http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
        requestBody = await request.json();

        return HttpResponse.json({
          id: 1,
          username: 'emily',
          email: 'emily@example.com',
          firstName: 'Emily',
          lastName: 'Johnson',
          gender: 'female',
          image: 'https://example.com/emily.jpg',
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
        });
      }),
    );

    renderWithQueryClient(<Login />);

    const username = screen.getByRole('textbox', {
      name: /user name/i,
    });

    const password = screen.getByLabelText(/password/i);

    await user.type(username, 'emily');
    await user.type(password, 'emilyspass');

    await user.click(
      screen.getByRole('button', {
        name: /sign in/i,
      }),
    );

    await waitFor(() => {
      expect(requestBody).toEqual({
        username: 'emily',
        password: 'emilyspass',
        expiresInMins: 30,
      });
    });
  });

  it('disables the sign in button while login is pending', async () => {
    const user = userEvent.setup();

    server.use(
      http.post(`${API_BASE_URL}/auth/login`, async () => {
        await delay(1000);

        return HttpResponse.json({
          id: 1,
          username: 'emily',
          email: 'emily@example.com',
          firstName: 'Emily',
          lastName: 'Johnson',
          gender: 'female',
          image: 'https://example.com/emily.jpg',
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
        });
      }),
    );

    renderWithQueryClient(<Login />);

    await user.type(screen.getByRole('textbox', { name: /user name/i }), 'emily');

    await user.type(screen.getByLabelText(/password/i), 'emilyspass');

    const submitButton = screen.getByRole('button', {
      name: /sign in/i,
    });

    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it('does not call the login API when the form is invalid', async () => {
    const user = userEvent.setup();

    let apiCalled = false;

    server.use(
      http.post(`${API_BASE_URL}/auth/login`, () => {
        apiCalled = true;

        return HttpResponse.json({
          id: 1,
          username: 'emily',
          email: 'emily@example.com',
          firstName: 'Emily',
          lastName: 'Johnson',
          gender: 'female',
          image: 'https://example.com/emily.jpg',
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token',
        });
      }),
    );

    renderWithQueryClient(<Login />);

    const submitButton = screen.getByRole('button', {
      name: /sign in/i,
    });

    await user.click(submitButton);

    expect(apiCalled).toBe(false);
  });

  it('displays an error when the login API is unreachable', async () => {
    const user = userEvent.setup();

    server.use(
      http.post(`${API_BASE_URL}/auth/login`, () => {
        return HttpResponse.error();
      }),
    );

    renderWithQueryClient(<Login />);

    await user.type(screen.getByRole('textbox', { name: /user name/i }), 'emily');

    await user.type(screen.getByLabelText(/password/i), 'emilyspass');

    await user.click(
      screen.getByRole('button', {
        name: /sign in/i,
      }),
    );

    expect(await screen.findByText('Login Failed')).toBeInTheDocument();
  });
});
