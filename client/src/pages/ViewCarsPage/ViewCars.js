import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const sampleCarData = [
  {
    name: "Toyota  Corolla",
    make: "Toyota",
    model: "Sedan",
    color: "White",
    year: "2023",
    src: "Camry.jpg"

  },
  {
    name: "Ford F-150",
    make: "Ford",
    model: "Truck",
    color: "Gray",
    year: "2022",
    src: "Ford F-150.jpg"
  },
  {
    name: "Toyota Camry",
    make: "Toyota",
    model: "Sedan",
    color: "White",
    year: "2023",
    src: "Camry.jpg"
  },
  {
    name: "Ford Mustang",
    make: "Ford",
    model: "Sport",
    color: "Yellow",
    year: "2012",
    src: "Mustang.jpg"
  },
]

function NavigateToReservationPage() {
  window.open('/rental');
}

function ViewCars() {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-75 mt-4 border border-5 p-3">
        <h1 className="mb-4 text-center">Find your car</h1>
        <div className="d-flex flex-row  justify-content-center gap-5">
          <Grid item xs={6}>
            <TextField
              label="Car Name"
              inputVariant="outlined"
              fullWidth
            //onChange={(date) => setSelectedPickupDate(date)}
            //slotProps={{
            //textField: {
            //error: !pickupDateValid() && submissionAttempted,
            //helperText: !pickupDateValid() && submissionAttempted
            // ?
            //"Invalid Date"
            //: "",
            //},
            //}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Car Make"
              inputVariant="outlined"
              fullWidth
            //onChange={(date) => setSelectedPickupDate(date)}
            //slotProps={{
            //textField: {
            //error: !pickupDateValid() && submissionAttempted,
            //helperText: !pickupDateValid() && submissionAttempted
            // ?
            //"Invalid Date"
            //: "",
            //},
            //}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Car Model"
              inputVariant="outlined"
              fullWidth
            //onChange={(date) => setSelectedPickupDate(date)}
            //slotProps={{
            //textField: {
            //error: !pickupDateValid() && submissionAttempted,
            //helperText: !pickupDateValid() && submissionAttempted
            // ?
            //"Invalid Date"
            //: "",
            //},
            //}}
            />
          </Grid>
        </div>
        <div className="d-flex flex-row  justify-content-center gap-5 mt-5">
          <Grid item xs={6}>
            <TextField
              label="Color"
              inputVariant="outlined"
              fullWidth
            //onChange={(date) => setSelectedPickupDate(date)}
            //slotProps={{
            //textField: {
            //error: !pickupDateValid() && submissionAttempted,
            //helperText: !pickupDateValid() && submissionAttempted
            // ?
            //"Invalid Date"
            //: "",
            //},
            //}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Year"
              inputVariant="outlined"
              fullWidth
            //onChange={(date) => setSelectedPickupDate(date)}
            //slotProps={{
            //textField: {
            //error: !pickupDateValid() && submissionAttempted,
            //helperText: !pickupDateValid() && submissionAttempted
            // ?
            //"Invalid Date"
            //: "",
            //},
            //}}
            />
          </Grid>
        </div>
      </div>

      <div className="mt-5">
        <div className="row">
          {sampleCarData.map((car, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <img src={car.src} className="card-img-top p-2" alt={car.name} style={{ height: '300px' }} />
                <div className="card-body">
                  <h5 className="card-title">{car.name}</h5>
                  <p className="card-text">
                    <strong>Make:</strong> {car.make}
                    <br />
                    <strong>Model:</strong> {car.model}
                    <br />
                    <strong>Color:</strong> {car.color}
                    <br />
                    <strong>Year:</strong> {car.year}
                    <br />
                    <Button onClick={() => NavigateToReservationPage()}
                      className="btn btn-primary mt-3"
                      variant="contained"
                    >
                      Book Now

                    </Button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCars;
