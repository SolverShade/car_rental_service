import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button }
  from '@mui/material';

const CarManagement = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/list_cars');
      setCars(response.data);
    };
    fetchData();
  }, []);

  const handleRemoveCar = (id) => {
    // Add logic to remove car
    console.log(`Remove car with ID: ${id}`);
  };

  const handleRevokeRental = (id) => {
    // Add logic to revoke rental
    console.log(`Revoke rental for car with ID: ${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom style={
          {
            marginBottom: '40px',
            textAlign: 'center'
          }
        }>
        Car Management
      </Typography>
      <div
        style=
        {
          { display: 'flex', justifyContent: 'center' }
        }>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { }}
          style={{ marginBottom: '40px' }}>
          Add car to stock
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Daily Cost</TableCell>
              <TableCell>Rented</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.id}</TableCell>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.daily_cost + "$"}</TableCell>
                <TableCell>{car.rented ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <img src={car.image_url} alt={car.name} style={{ width: '100px' }} />
                </TableCell>
                <TableCell style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <Button variant="contained" color="primary" onClick={() => handleRemoveCar(car.id)}>
                    Remove Car
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleRevokeRental(car.id)}>
                    Revoke Rental
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CarManagement;
