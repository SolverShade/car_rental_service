import React, { useState, useEffect } from 'react';
import './Header.css';
import {
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Box, Typography, InputLabel,
  MenuItem, Select
} from '@mui/material';
import TextField from '@mui/material/TextField';

function Header() {
  const [openLogin, setLoginOpen] = useState(false);
  const [openSignup, setSignupOpen] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);

  const handleLinkClick = (event) => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (!loggedIn) {
      setLoginOpen(true);
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

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidUsername(username) {
    //TODO: check for username in database
  }

  function isValidPassword(password) {
    return password.length >= 8;
  }

  async function handleSignup() {
    //TODO: Implement signup and create user
    handleLoginClose();
  }


  async function handleLogin() {
    //TODO: Implement login and get token
    handleLoginClose();
  }

  return (
    <header>
      <div class="header">
        <img src="/black_logo.png" alt="Icon" style={{ marginRight: '10px' }} />
        <a href="/" class="logo">Car Rental Service</a>
        <div class="header-right">
          <a class="/" href="/">HOME</a>
          <a className="/staff_portal" href="/" onClick={handleLinkClick}>STAFF/ADMIN PORTAL</a>
          <Dialog open={openLogin} onClose={handleLoginClose}>
            <DialogTitle>{"Login"}</DialogTitle>
            <DialogContent>
              <br />
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={!isValidEmail(email)}
                  helperText=
                  {
                    !isValidEmail(email)
                      ? "Invalid Email"
                      : ""
                  }
                />
                <TextField
                  label="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={!isValidPassword(password)}
                  helperText=
                  {
                    !isValidPassword(password)
                      ? "Invalid Password"
                      : ""
                  }
                />
                <Typography variant="body2" color="textSecondary" align="center">
                  Don't have an account? Follow this link to
                  <Button onClick={() => {
                    setSignupOpen(true);
                    handleLoginClose();
                  }
                  }>
                    Sign up
                  </Button>.
                </Typography>
                <Button onClick={handleLogin} color="primary">
                  Submit
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLoginClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openSignup} onClose={handleLoginClose}>
            <DialogTitle>{"Sign Up"}</DialogTitle>
            <DialogContent>
              <br />
              <Box display="flex" flexDirection="column" gap={2} mt={2} minWidth={500}>
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
                <TextField
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={!isValidEmail(email)}
                  helperText=
                  {
                    !isValidEmail(email)
                      ? "Invalid Email"
                      : ""
                  }
                />
                <TextField
                  label="Username"
                />
                <TextField
                  label="Password"
                />
                <TextField
                  label="First Name"
                />
                <TextField
                  label="Last Name"
                />
                <Button onClick={handleLogin} color="primary">
                  Submit
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSignupClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <a href="/signup">SIGN UP</a>
          <a href="/login">LOG IN</a>
        </div>
      </div>
    </header >
  );
}

export default Header;
