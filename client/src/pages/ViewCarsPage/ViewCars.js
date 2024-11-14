import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';

function ViewCars() {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    async function getAvailableCars() {
      try {
        const response = await axios.get('http://localhost:5000/list_cars');
        setCarData(response.data);
      } catch (error) {
        console.error('There was an error making the request:', error);
      }
    }

    getAvailableCars();
  }, []);

  async function saveCarToReservation(carId) {
    const reservationId = sessionStorage.getItem('reservationId');

    axios.post(`http://localhost:5000/add_car_id_to_reservation/${reservationId}`, {
      car_id: carId
    })
      .then(response => {
        sessionStorage.setItem('carId', carId);
        console.log('Response:', response.data);
        console.log('Car ID:', carId);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function NavigateToReservationPage() {
    window.open('/rental');
  }

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
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Car Make"
              inputVariant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Car Model"
              inputVariant="outlined"
              fullWidth
            />
          </Grid>
        </div>
        <div className="d-flex flex-row  justify-content-center gap-5 mt-5">
          <Grid item xs={6}>
            <TextField
              label="Year"
              inputVariant="outlined"
              fullWidth
            />
          </Grid>
        </div>
      </div>
      <div className="mt-5">
        <div className="row">
          {carData.map((car, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <img src={car.image_url} className="card-img-top p-2" alt={car.name} style={{ height: '300px' }} />
                <div className="card-body">
                  <h5 className="card-title">{car.name}</h5>
                  <p className="card-text">
                    <strong>Make:</strong> {car.make}
                    <br />
                    <strong>Model:</strong> {car.model}
                    <br />
                    <strong>Year:</strong> {car.year}
                    <br />
                    <Button onClick={() => {
                      saveCarToReservation(car.id);
                      NavigateToReservationPage();
                    }}
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
