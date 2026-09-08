import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@mui/material/Typography';

const signInSchema = z.object({
  username: z.string().min(1, 'Username is required'), // Catches empty inputs

  password: z.string().min(1, 'Password is required'), // Catches empty inputs
});

type SignInFormData = z.infer<typeof signInSchema>;

type LoginProps = {
  onSubmit?: (data: SignInFormData) => void;
};

const Login = ({ onSubmit }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
    defaultValues: { username: '', password: '' },
  });

  const handleLoginSubmit = (data: SignInFormData) => {
    onSubmit?.(data);
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
        <Box
          component="form"
          onSubmit={handleSubmit(handleLoginSubmit)}
          aria-labelledby="login-form-title"
        >
          <Typography
            id="login-form-title"
            variant="h5"
            component="h1"
            sx={{ textAlign: 'center' }}
          >
            Sign In
          </Typography>
          <Stack spacing={2} sx={{ display: 'inline-flex' }}>
            <TextField
              id="username"
              label="User Name"
              type="text"
              error={errors?.username ? true : false}
              helperText={errors?.username?.message}
              {...register('username')}
            />

            <TextField
              id="password"
              type="password"
              label="Password"
              error={errors?.password ? true : false}
              helperText={errors?.password?.message}
              {...register('password')}
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Sign In
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};
export default Login;
