import React from 'react';
import { useNavigate } from 'react-router';
import './styles/Login.css';

const Login = () => {
  let navigate = useNavigate();

  const [data, setData] = React.useState({
    username: '',
    password: '',
  });

  

  const [error, setError] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (data.username === '' || data.password === '') {
      setError(true);
      return;
    }
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/home');
  };

  return (
    <div className='login-screen'>
      <div className='input-container'>
        <label htmlFor='username'>Username</label>
        <input
          name='username'
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      {error && <p className='invalid'>Please fill all necessary details</p>}
      <button onClick={handleClick}> login </button>
    </div>
  );
};

export default Login;
