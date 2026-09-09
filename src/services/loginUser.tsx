interface ILoginCredentials {
  username: string;
  password: string;
}

interface ILoggedInUserDetials {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string; // JWT accessToken (for backward compatibility) in response and cookies
  refreshToken: string; // refreshToken in response and cookies
}

const loginUser = async (credentials: ILoginCredentials): Promise<ILoggedInUserDetials> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 30, // optional, defaults to 60
    }),
    credentials: 'include', // Include cookies (e.g., accessToken) in the request
  });

  if (!response.ok) throw new Error('Login Failed');

  return response.json();
};

export default loginUser;
