import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from '@mui/material';

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [update, setUpdate] = useState(false); // State to trigger useEffect
  const [open, setOpen] = useState(false); // State to manage dialog open/close
  const [newCar, setNewCar] = useState({ name: '', make: '', model: '', year: '', daily_cost: '', image_url: '' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/list_cars');
      setCars(response.data);
    };
    fetchData();
  }, [update]);

  const handleRemoveCar = async (id) => {
    await axios.delete(`http://localhost:5000/remove_car/${id}`);
    setUpdate(prev => !prev);
  };

  const handleRevokeRental = async (id) => {
    await axios.put(`http://localhost:5000/set_car_rented/${id}`, { rented: false });
    setUpdate(prev => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleAddCar = async () => {
    await axios.post('http://localhost:5000/add_car', {
      name: newCar.name,
      make: newCar.make,
      model: newCar.model,
      year: newCar.year,
      daily_cost: newCar.daily_cost,
      rented: false,
      image_url: newCar.image_url
    });
    setUpdate(prev => !prev);
    handleClose();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          marginBottom: '40px',
          textAlign: 'center',
          fontFamily: 'Roboto, sans-serif'
        }}>
        Car Stock Management
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          style={{ marginBottom: '40px' }}>
          Add car to stock
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new car to the stock.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newCar.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="make"
            label="Make"
            type="text"
            fullWidth
            value={newCar.make}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="model"
            label="Model"
            type="text"
            fullWidth
            value={newCar.model}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="year"
            label="Year"
            type="number"
            fullWidth
            value={newCar.year}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="daily_cost"
            label="Daily Cost"
            type="number"
            fullWidth
            value={newCar.daily_cost}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="image_url"
            label="Image URL"
            type="text"
            fullWidth
            value={newCar.image_url}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddCar} color="primary">
            Add Car
          </Button>
        </DialogActions>
      </Dialog>
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
