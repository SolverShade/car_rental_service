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
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';

function Header() {
  const [openLogin, setLoginOpen] = useState(false);
  const [openSignup, setSignupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [signupAttempted, setSignupAttempted] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const userFound = sessionStorage.getItem('userFound') === 'true';

    if (firstName === '' || lastName === '') {
      const storedFirstName = sessionStorage.getItem('firstName');
      const storedLastName = sessionStorage.getItem('lastName');

      if (storedFirstName != null) {
        setFirstName(storedFirstName);
      } else {
        setFirstName('');
      }

      if (storedLastName != null) {
        setLastName(storedLastName);
      } else {
        setLastName('');
      }
    }

    setUserFound(userFound);
  }, []);

  const handleLoginLink = (event) => {
    const loggedIn = sessionStorage.getItem('userFound');
    if (!loggedIn) {
      setLoginOpen(true);
      event.preventDefault();
    }
  };

  const handleSignupLink = (event) => {
    const loggedIn = sessionStorage.getItem('userFound');
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

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidFirstName() {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(firstName) && firstName.length >= 2;
  }

  function isValidLastName() {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(lastName) && lastName.length >= 2;
  }

  function isValidUsername() {
    const regex = /^[A-Za-z]+$/;
    return username.length >= 3 && regex.test(username);
  }

  function isValidPassword() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function isValidPhoneNumber() {
    const phoneRegex = /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneRegex.test(phoneNumber);
  }

  async function handleSignup() {
    setSignupAttempted(true);

    if (!isValidEmail() || !isValidUsername() || !isValidPassword() || !isValidFirstName() || !isValidLastName() || userType == null) {
      return;
    }

    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('User Type:', userType);
    console.log('phone:', phoneNumber.replace(/\D/g, ''));

    const signupData = {
      email: email,
      username: username,
      phone_number: phoneNumber.replace(/\D/g, ''),
      password: password,
      first_name: firstName,
      last_name: lastName,
      isAdmin: userType
    };

    await axios.post('http://localhost:5000/create_staff', signupData)
      .then(response => {
        NotificationManager.success('Success', 'Signup successful', 1250);
        setSignupOpen(false);
      })
      .catch(error => {
        NotificationManager.error('Error',
          'Signup unsuccessful: ensure entries are unique', 8000);
      });
  }


  async function handleLogin() {
    const loginData = {
      username: username,
      password: password,
    };

    await axios.post('http://localhost:5000/login', loginData)
      .then(response => {
        sessionStorage.setItem('isStaff', response.data.login_successful);
        sessionStorage.setItem('userFound', true);
        sessionStorage.setItem('firstName', response.data.first_name);
        sessionStorage.setItem('lastName', response.data.last_name);

        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);

        setLoginAttempted(true);
        setUserFound(true);
        setLoginOpen(false);

        NotificationManager.success('Success', 'login successful', 1250);
      })
      .catch(error => {
        setLoginAttempted(true);
        NotificationManager.error('Error', 'login unsuccessful', 1250);
      });
  }

  return (
    <header>
      <div class="header">
        <img src="/black_logo.png" alt="Icon" style={{ marginRight: '10px' }} />
        <a href="/" class="logo">Car Rental Service</a>
        <div class="header-right">
          <a
            class="/"
            href="/"
          >
            HOME
          </a>
          <a
            className="/staff_portal"
            href="/staff_portal"
            onClick={handleLoginLink}>
            STAFF/ADMIN PORTAL
          </a>
          <Dialog open={openLogin} onClose={handleLoginClose}>
            <DialogTitle>
              {"Staff/Admin Login"}
              <GavelIcon style={{ marginLeft: "16px" }} />
              <Button
                style={{ marginLeft: "248px" }}
                variant="contained"
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
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                  label="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {!userFound && loginAttempted && (
                  <h6 style={{ color: 'red', textAlign: 'center' }}>User not found</h6>
                )}
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
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value.trim())}
                      error={!isValidFirstName() && signupAttempted}
                      helperText={!isValidFirstName() && signupAttempted ? "must be a-z letters > 2" : ""}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value.trim())}
                      error={!isValidLastName() && signupAttempted}
                      helperText={!isValidLastName() && signupAttempted ? "must be a-z letters > 2" : ""}
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={!isValidEmail() && signupAttempted}
                  helperText={!isValidEmail() && signupAttempted ? "Invalid Email: format sample@email.com" : ""}
                />
                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  error={!isValidPhoneNumber() && signupAttempted}
                  helperText={!isValidPhoneNumber() && signupAttempted ? "Enter valid phone number" : ""}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Username"
                      fullWidth
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      error={!isValidUsername() && signupAttempted}
                      helperText={!isValidUsername() && signupAttempted
                        ?
                        "must be a-z letters > 3"
                        : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      error={!isValidPassword() && signupAttempted}
                      helperText={!isValidPassword() && signupAttempted
                        ?
                        "requires 8 characters, 1 uppercase, 1 lowercase, 1 number"
                        : ""
                      }
                    />
                  </Grid>
                </Grid>
                <TextField
                  select
                  label="User Type"
                  value={userType}
                  onChange={(event) => setUserType(event.target.value)}
                  error={userType == null && signupAttempted}
                  helperText={!userType == null && signupAttempted ? "Must set user type" : ""}
                >
                  <MenuItem value={false}>Staff</MenuItem>
                  <MenuItem value={true}>Admin</MenuItem>
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
          {userFound ? (
            <a> {"Staff Member: " + firstName + " "} {lastName} </a>
          ) : (
            <>
              <a className="signup" href="/" onClick={handleSignupLink}>SIGN UP</a>
              <a className="login" href="/" onClick={handleLoginLink}>LOGIN</a>
            </>
          )}
        </div>
      </div>
    </header >
  );
}

export default Header;
