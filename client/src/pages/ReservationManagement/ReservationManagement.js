import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [currentBillId, setCurrentBillId] = useState(null);
  const [currentCarId, setCurrentCarId] = useState(null);
  const [currentBill, setCurrentBill] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentCar, setCurrentCar] = useState(null);
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [carDialogOpen, setCarDialogOpen] = useState(false);
  const [billDialogOpen, setBillDialogOpen] = useState(false);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reservations_with_ids');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const fetchBill = async (billId) => {
    try {
      const response = await axios.get(`http://localhost:5000/get_bill/${billId}`);
      setCurrentBill(response.data);
    } catch (error) {
      console.error('Error fetching bill:', error);
    }
  };

  const fetchCustomer = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/get_customer/${customerId}`);
      setCurrentCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const fetchCar = async (carId) => {
    try {
      const response = await axios.get(`http://localhost:5000/get_car/${carId}`);
      setCurrentCar(response.data);
    } catch (error) {
      console.error('Error fetching car:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleViewCustomer = (customerId) => {
    setCurrentCustomerId(customerId);
    fetchCustomer(customerId);
    setCustomerDialogOpen(true);
  };

  const handleViewBill = (billId) => {
    setCurrentBillId(billId);
    fetchBill(billId);
    setBillDialogOpen(true);
  };

  const handleViewCar = (carId) => {
    setCurrentCarId(carId);
    fetchCar(carId);
    setCarDialogOpen(true);
  };

  return (
    <div>
      <Typography className='text-center mt-4 mb-4' variant="h4" gutterBottom>
        Reservation Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Dropoff Location</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Car</TableCell>
              <TableCell>Bill</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <TableCell>{reservation.start_date}</TableCell>
                <TableCell>{reservation.end_date}</TableCell>
                <TableCell>{reservation.start_time}</TableCell>
                <TableCell>{reservation.end_time}</TableCell>
                <TableCell>{reservation.pickup_location}</TableCell>
                <TableCell>{reservation.dropoff_location}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewCustomer(reservation.customer_id)}>View Customer</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleViewCar(reservation.car_id)}>View Car</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleViewBill(reservation.bill_id)}>View Bill</Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => { }} style={{ marginRight: '10px' }}>
                    Set car picked up
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => { }}>
                    Set car dropped off
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render dialogs conditionally */}
      {currentCustomer && (
        <CustomerDialog
          open={customerDialogOpen}
          onClose={() => setCustomerDialogOpen(false)}
          customer={currentCustomer}
        />
      )}
      {currentCar && (
        <CarDialog
          open={carDialogOpen}
          onClose={() => setCarDialogOpen(false)}
          car={currentCar}
        />
      )}
      {currentBill && (
        <BillDialog
          open={billDialogOpen}
          onClose={() => setBillDialogOpen(false)}
          bill={currentBill}
        />
      )}
    </div>
  );
};


const CustomerDialog = ({ open, onClose, customer }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent>
        <div>{`Name: ${customer.first_name}  ${customer.last_name}`}</div>
        <div>Email: {customer.email}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const CarDialog = ({ open, onClose, car }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Car Details</DialogTitle>
      <DialogContent>
        {/* Display car details here */}
        <div>Model: {car.model}</div>
        <div>License Plate: {car.licensePlate}</div>
        {/* Add more fields as necessary */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};


const BillDialog = ({ open, onClose, bill }) => {

  const onPayBill = async () => {

  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bill Details</DialogTitle>
      <DialogContent>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <div style={{ marginBottom: '10px' }}><strong>ID:</strong> {bill.id}</div>
          <div style={{ marginBottom: '10px' }}><strong>Total Cost:</strong> {bill.totalcost}</div>
          <div style={{ marginBottom: '10px' }}><strong>Is Payed:</strong> {bill.isPayed ? 'Yes' : 'No'}</div>
          <div style={{ marginBottom: '10px' }}><strong>In Person:</strong> {bill.inPerson ? 'Yes' : 'No'}</div>
          <div style={{ marginBottom: '10px' }}><strong>Credit Card:</strong> {bill.credit_card}</div>
          <div style={{ marginBottom: '10px' }}><strong>Card Name:</strong> {bill.card_name}</div>
          <div style={{ marginBottom: '10px' }}><strong>Card Expiration Date:</strong> {bill.card_expiration_data}</div>
          <div style={{ marginBottom: '10px' }}><strong>Card CVC:</strong> {bill.card_cvc}</div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          style={{ width: '100%', padding: '15px', fontSize: '16px', backgroundColor: '#3f51b5', color: '#fff', borderColor: '#3f51b5' }}
        >
          Close
        </Button>
        <Button
          onClick={onPayBill}
          color="secondary"
          variant="outlined"
          style={{ width: '100%', padding: '15px', fontSize: '16px', backgroundColor: '#3f51b5', color: '#fff', borderColor: '#3f51b5' }}
        >
          Pay Bill
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default ReservationManagement;
