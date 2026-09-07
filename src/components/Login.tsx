import { useState } from 'react';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const getUserName = ($event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(userName);
  };

  const getPassword = ($event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(password);
  };

  const signIn = () => {
    console.log('UserName::', userName);
    console.log('PassWord::', password);
  };

  return (
    <form onSubmit={signIn}>
      <input type="text" value={userName} onChange={getUserName} />
      <input type="text" value={password} onChange={getPassword} />
      <button type="submit">Sign In</button>
      <span>First Time User? SignIn</span>
    </form>
  );
};
export default Login;
