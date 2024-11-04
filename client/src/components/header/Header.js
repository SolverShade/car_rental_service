import React, { useState, useEffect } from 'react';
import './Header.css';
import {
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Box, Typography, InputLabel,
  MenuItem, Select, Grid
} from '@mui/material';
import TextField from '@mui/material/TextField';
import GavelIcon from '@mui/icons-material/Gavel';

function Header() {
  const [openLogin, setLoginOpen] = useState(false);
  const [openSignup, setSignupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [signupAttempted, setSignupAttempted] = useState(false);

  const handleLoginLink = (event) => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (!loggedIn) {
      setLoginOpen(true);
      event.preventDefault();
    }
  };

  const handleSignupLink = (event) => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (!loggedIn) {
      setSignupOpen(true);
      event.preventDefault();
    }
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  function searchForExistingAccount() {
    //TODO: check for account in database
  }

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidUsername(username) {
    //TODO: check for username in database
  }

  function isValidPassword() {
    return password.length >= 8;
  }

  async function handleSignup() {
    //TODO: Implement signup and create user
    setSignupAttempted(true);
  }


  async function handleLogin() {
    //TODO: Implement login and get token

    setLoginAttempted(true);
    //handleLoginClose();
  }

  return (
    <header>
      <div class="header">
        <img src="/black_logo.png" alt="Icon" style={{ marginRight: '10px' }} />
        <a href="/" class="logo">Car Rental Service</a>
        <div class="header-right">
          <a class="/" href="/">HOME</a>
          <a className="/staff_portal" href="/" onClick={handleLoginLink}>STAFF/ADMIN PORTAL</a>
          <Dialog open={openLogin} onClose={handleLoginClose}>
            <DialogTitle>
              {"Staff/Admin Login"}
              <GavelIcon style={{ marginLeft: "16px" }} />
              <Button
                style={{ marginLeft: "248px" }}
                variant="contained"
                className="top-right-button"
                onClick={handleLoginClose}
                color="error"
              >
                Close
              </Button>
            </DialogTitle>
            <DialogContent>
              <br />
              <Box display="flex" flexDirection="column" gap={3} mt={0}>
                <TextField
                  label="Username"
                  value={email}
                  onChange={(event) => setUsername(event.target.value)}
                  slotProps={{
                    error: !isValidUsername() && loginAttempted,
                    helperText: !isValidUsername() && loginAttempted
                      ? "Invalid Username"
                      : ""
                  }}
                />
                <TextField
                  label="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  slotProps={{
                    error: !isValidPassword() && loginAttempted,
                    helperText: !isValidPassword() && loginAttempted
                      ?
                      "Invalid Password"
                      : "",
                  }}
                />
                <Button
                  onClick={handleLogin}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                <br />
                <Typography variant="body2" color="textSecondary" align="center">
                  Don't have an account? Follow this link to create your
                  staff or admin account
                  <Button onClick={() => {
                    setSignupOpen(true);
                    handleLoginClose();
                  }
                  }>
                    Sign up
                  </Button>
                </Typography>
              </Box>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openSignup}
            onClose={handleLoginClose}
            PaperProps={{
              style: {
                minWidth: '600px', // Set the minimum width here
              },
            }}
          >
            <DialogTitle>{"Staff/Admin Sign Up"}
              <GavelIcon style={{ marginLeft: "16px" }} />
              <Button
                style={{ marginLeft: "248px", maxWidth: '120px' }}
                variant="contained"
                className="top-right-button"
                onClick={handleSignupClose}
                color="error"
              >
                Close
              </Button>
            </DialogTitle>
            <DialogContent>
              <br />
              <Box display="flex" flexDirection="column" gap={3} mt={0}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  slotProps={{
                    error: !isValidEmail() && signupAttempted,
                    helperText: !isValidEmail() && signupAttempted
                      ?
                      "Invalid Email"
                      : "",
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Username"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Password"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  select
                  label="User Type"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                //value={}
                //onChange={handleChange}
                >
                  <MenuItem value={0}>Staff</MenuItem>
                  <MenuItem value={1}>Admin</MenuItem>
                </TextField>
                <Button
                  onClick={handleSignup}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
          <a className="/signup" href="/" onClick={handleSignupLink}>SIGN UP</a>
          <a className="/login" href="/" onClick={handleLoginLink}>LOGIN</a>
        </div>
      </div>
    </header >
  );
}

export default Header;
