import loginUser from '../services/authApi';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
  });

  return mutation;
};

export default useLogin;
