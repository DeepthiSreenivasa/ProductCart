import { useEffect } from 'react';
import loginUser from '../services/loginUser';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  const mutation = useMutation({
    mutationFn: loginUser,
  });

  return mutation;
};

export default useLogin;
