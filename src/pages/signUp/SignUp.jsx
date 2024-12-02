import { FormControl, TextField, Button } from '@mui/material';
import { resources } from '../../resources/resources';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postUsers } from '../../services/api/apiUsers';

export default function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const isValid = userName.trim() !== '' && email.trim() !== '' && password.trim() !== '';
    if (isValid) {
      await postUsers(userName, email, password);
      navigate('/login');
    } else {
      setError(resources.signUp.errorMessage);
    }
  };

  return (
    <div className="wrapper_form">
      <form className="form" onSubmit={handleSubmit}>
        <h1>{resources.signUp.title}</h1>
        <FormControl sx={{ gap: '20px' }} fullWidth>
          <div className="formInputs">
            <TextField
              id="outlined-controlled"
              label={resources.signUp.name}
              type="text"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <TextField
              id="outlined-controlled"
              label={resources.signUp.email}
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              id="outlined-controlled"
              label={resources.signUp.password}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </FormControl>
        {error && <p className="error">{error}</p>}
        <div className="form_wrapper-btn">
          <Button sx={{ marginTop: '10px' }} type="submit" variant="outlined">
            {resources.signUp.btnSignUp}
          </Button>
          <Link className="form_signUp" to="/login">
            {resources.signUp.link}
          </Link>
        </div>
      </form>
    </div>
  );
}
