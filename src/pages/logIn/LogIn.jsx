import { FormControl, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { resources } from '../../resources/resources';
import { getUsers } from '../../services/api/apiUsers';
import './logIn.css';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const users = await getUsers();
    const findUser = users.find(
      (user) => user.email === email.trim() && user.password === password.trim(),
    );
    if (findUser) {
      localStorage.setItem('userId', findUser.id);
      navigate('/App');
    } else {
      setMessage(resources.logIn.errorMessage);
    }
  };
  return (
    <div className="wrapper_form">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <FormControl sx={{ gap: '20px' }} fullWidth>
          <div className="formInputs">
            <TextField
              id="outlined-controlled"
              label={resources.logIn.email}
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage('');
              }}
            />
            <TextField
              id="outlined-controlled"
              label={resources.logIn.password}
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setMessage('');
              }}
            />
          </div>
        </FormControl>
        {message && <p className="error">{resources.logIn.errorMessage}</p>}
        <div className="form_wrapper-btn">
          <Button type="submit" variant="outlined">
            {resources.logIn.btmLogIn}
          </Button>

          <Link className="form_signUp" to="/signUp">
            {resources.logIn.link}
          </Link>
        </div>
      </form>
    </div>
  );
}
