import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { HTMLFormMethod } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formError, setFormError] = useState({ usernameInvalid: false, passwordInvalid: false });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const getUserName = ($event: React.ChangeEvent<HTMLInputElement>) => {
    let name = $event.target.value;

    setFormData((prev) => {
      return { ...prev, username: name };
    });

    if (!emailRegex.test(formData.username)) {
      console.log('Into else');
      setFormError((prev) => {
        return {
          ...prev,
          usernameInvalid: true,
        };
      });
      console.log('Error::', formError.usernameInvalid);
    }
  };

  const getPassword = ($event: React.ChangeEvent<HTMLInputElement>) => {
    let password = $event.target.value;
    setFormData((prev) => {
      return { ...prev, password: password };
    });
  };

  const handleSubmit = ($event: React.FormEvent<HTMLFormElement>) => {
    $event.preventDefault();
    console.log('FormEvent::', formData);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ display: 'inline-flex' }}>
            <TextField
              required
              id="username"
              label="User Name"
              type="email"
              value={formData?.username}
              onChange={getUserName}
              error={formError.usernameInvalid}
              helperText={formError.usernameInvalid ? 'Invalid UserName' : ''}
            />
            <TextField
              required
              id="password"
              type="password"
              label="Password"
              value={formData?.password}
              onChange={getPassword}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={formError.usernameInvalid || formError.passwordInvalid}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};
export default Login;
