import { http, HttpResponse } from 'msw';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = await request.json();

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
];
