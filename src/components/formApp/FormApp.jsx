import * as React from 'react';
import { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, TextField, Button } from '@mui/material';

import './formApp.css';
import { getDocuments, postDocuments } from '../../services/api/apiDocuments';
import { resources } from '../../resources/resources';

export default function FormApp({ users }) {
  const userAcc = localStorage.getItem('userId');
  const [error, setError] = useState(false);
  const [name, setName] = useState(userAcc);
  const [docName, setDocName] = useState('');
  const [pressed, setPressed] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
    console.log(name);
    setError(false);
    setPressed(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resApp = await getDocuments();

    const existApp = resApp.some(
      (app) => app.userId === name && app.documentName === docName.trim(),
    );

    if (existApp) {
      setError(true);
    } else {
      await postDocuments(name, docName);

      setError(false);
      setDocName('');
    }
    setPressed(true);
  };

  const isValid = () => {
    return name && docName.trim();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="titleForm">{resources.form.title}</h1>
        <FormControl sx={{ gap: '20px' }} fullWidth>
          <div className="formInputs">
            <InputLabel id="demo-simple-select-label">{resources.form.inputUser}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              label={resources.form.inputUser}
              onChange={handleChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              id="outlined-controlled"
              label={resources.form.inputDocument}
              value={docName}
              onChange={(event) => {
                setDocName(event.target.value);
                setError(false);
                setPressed(false);
              }}
            />
          </div>
        </FormControl>
        <Button disabled={!isValid()} sx={{ marginTop: '30px' }} type="submit" variant="outlined">
          {resources.form.btnName}
        </Button>
      </form>
      {pressed && (
        <p style={{ color: error ? 'red' : 'green', margin: '10px 0' }}>
          {error ? resources.formMessage.postUnSuccesful : resources.formMessage.postSuccesful}
        </p>
      )}
    </>
  );
}
