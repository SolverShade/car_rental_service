import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Button from '@mui/material/Button';

function Home() {
  const [submissionAttempted, setSubmissionAttempted] = React.useState(false);
  const [selectedPickupLocation, setSelectedPickupLocation] = React.useState('');
  const [selectedDropoffLocation, setSelectedDropoffLocation] = React.useState('');
  const [selectedPickupDate, setSelectedPickupDate] = React.useState('');
  const [selectedDropOffDate, setSelectedDropOffDate] = React.useState('');
  const [selectedPickupTime, setSelectedPickupTime] = React.useState('');
  const [selectedDropOffTime, setSelectedDropOffTime] = React.useState('');

  const pickupDateValid = () => {
    if (dateValid() == true && selectedPickupDate != '') {
      return true;
    }

    return false;
  }

  const dropoffDateValid = () => {
    if (dateValid() == true && selectedDropOffDate != '') {
      return true;
    }

    return false;
  }

  const dateValid = () => {
    if (selectedPickupDate.$d <= selectedDropOffDate.$d) {
      return true;
    }

    return false;
  }

  const pickupTimeValid = () => {
    if (timeValid() == true) {
      return true;
    }

    return false;
  };

  const dropoffTimeValid = () => {
    if (timeValid() == true) {
      return true;
    }

    return false;
  };

  const timeValid = () => {
    if (selectedPickupTime.$d <= selectedDropOffTime.$d) {
      return true;
    }

    return false;
  }

  const pickupLocationValid = () => {
    if (selectedPickupLocation != '') {
      return true;
    }

    return false;
  }

  const dropoffLocationValid = () => {
    if (selectedPickupLocation != '') {
      return true;
    }

    return false;
  }

  const SubmitReservationRequest = () => {
    setSubmissionAttempted(true);

    console.log(submissionAttempted);
    console.log(pickupDateValid());
    console.log(dropoffDateValid());
    console.log(pickupTimeValid());
    console.log(dropoffTimeValid());
    console.log(pickupLocationValid());

    if (pickupDateValid() == true && dropoffDateValid() == true
      && pickupTimeValid() == true && dropoffTimeValid() == true
      && pickupLocationValid() == true && dropoffLocationValid() == true) {
      window.open('/view_cars');
    }
  }

  return (
    <div classname="allign-items-center">
      <div className="image-container">
        <img src="homepage_cars_image.jpeg" alt="background image"></img>
        <div className="overlay">
          <h2>RENT A CAR</h2>
          <TextField
            select
            label="Select Pickup-Location"
            value={selectedPickupLocation}
            onChange={(event) => setSelectedPickupLocation(event.target.value)}
            variant="outlined"
            fullWidth
            error={!pickupLocationValid() && submissionAttempted}
            helperText=
            {
              !pickupLocationValid() && submissionAttempted
                ? "Invalid Pickup Location"
                : ""
            }
          >
            <MenuItem value="28306">Hope Mills, NC, 28306</MenuItem>
            <MenuItem value="28301">Fayetteville, NC, 28301</MenuItem>
          </TextField>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Pick-Up Date"
                  inputVariant="outlined"
                  onChange={(date) => setSelectedPickupDate(date)}
                  slotProps={{
                    textField: {
                      error: !pickupDateValid() && submissionAttempted,
                      helperText: !pickupDateValid() && submissionAttempted
                        ?
                        "Invalid Date"
                        : "",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Drop-Off Date"
                  inputVariant="outlined"
                  onChange={(date) => setSelectedDropOffDate(date)}
                  slotProps={{
                    textField: {
                      error: !dropoffDateValid() && submissionAttempted,
                      helperText: !dropoffDateValid() && submissionAttempted
                        ? "Invalid Date"
                        : "",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Pick-up Time"
                  inputVariant="outlined"
                  onChange={(time) => setSelectedPickupTime(time)}
                  fullWidth
                  slotProps={{
                    textField: {
                      error: !pickupTimeValid() && submissionAttempted,
                      helperText: !pickupTimeValid() && submissionAttempted
                        ? "Invalid Time"
                        : "",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Drop-off Time"
                  inputVariant="outlined"
                  onChange={(time) => setSelectedDropOffTime(time)}
                  fullWidth
                  slotProps={{
                    textField: {
                      error: !dropoffTimeValid() && submissionAttempted,
                      helperText: !dropoffTimeValid() && submissionAttempted
                        ? "Invalid Time"
                        : "",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <TextField
            select
            label="Select Dropoff-Location"
            value={selectedDropoffLocation}
            onChange={(event) => setSelectedDropoffLocation(event.target.value)}
            variant="outlined"
            fullWidth
            error={!dropoffLocationValid() && submissionAttempted}
            helperText={!dropoffLocationValid() && submissionAttempted
              ? "Invalid Pickup Location"
              : ""}
          >
            <MenuItem value="28306">Hope Mills, NC, 28306</MenuItem>
            <MenuItem value="28301">Fayetteville, NC, 28301</MenuItem>
          </TextField>
          <br />
          <Button
            onClick={() => { setSubmissionAttempted(true); SubmitReservationRequest(); }}
            variant="contained"
            style={{ backgroundColor: 'black', color: 'white' }}
            fullWidth
          >
            View Cars
          </Button>
        </div>
      </div>
    </div >
  );
}

export default Home;
