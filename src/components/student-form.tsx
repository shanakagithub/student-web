import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';

function StudentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const apiUrl = (window as any).configs.apiUrl;
      const response = await fetch(apiUrl + '/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, dob }),
      });
      if (response.ok) {
        setSuccessMessage('Student saved successfully');
        setName('');
        setEmail('');
        setDob('');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      } else {
        setErrorMessage('Failed to save student');
        setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
      }
    } catch (error) {
      setErrorMessage('Error saving student: ' + error.message);
      setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Student Information Form
      </Typography>
      {successMessage && (
        <Typography variant="body1" color="primary" align="center">
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" color="error" align="center">
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
          type="email"
        />
        <TextField
          label="Date of Birth"
          variant="outlined"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          fullWidth
          required
          margin="normal"
          type="date"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default StudentForm;

