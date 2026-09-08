//TODO : use react hook form

import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { HTMLFormMethod } from 'react-router-dom';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (data) => {
    console.log('Form Data Submitted:', data);
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ display: 'inline-flex' }}>
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Username is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  id="username"
                  label="User Name"
                  type="email"
                  error={error ? true : false}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  id="password"
                  type="password"
                  label="Password"
                  error={error ? true : false}
                  helperText={error?.message}
                />
              )}
            />

            <Button type="submit" variant="contained" disabled={!isValid || isSubmitting}>
              Sign In
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};
export default Login;
