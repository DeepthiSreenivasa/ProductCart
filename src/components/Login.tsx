import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signInSchema = z.object({
  username: z.string().min(1, 'Username is required'), // Catches empty inputs

  password: z.string().min(1, 'Password is required'), // Catches empty inputs
});

type SignInFormData = z.infer<typeof signInSchema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (data: SignInFormData) => {
    console.log('Form Data Submitted');
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} aria-labelledby="login-form">
          <Stack spacing={2} sx={{ display: 'inline-flex' }}>
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  id="username"
                  label="User Name"
                  type="text"
                  error={error ? true : false}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
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
