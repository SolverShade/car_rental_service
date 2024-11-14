import 'bootstrap/dist/css/bootstrap.min.css';
import './Rental.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { formatTime } from '../../utility/DateUtils'

async function onFormFilled(bill_info, customer_info) {
  //Store bill
  //TODO: calculate real cost values when cars a stored in db

  let response = await axios.post(`http://localhost:5000/create_bill`,
    {
      totalcost: bill_info.finalCost,
      isPayed: false,
      inPerson: bill_info.inPerson,
      credit_card: bill_info.creditCardNumber,
      card_name: bill_info.cardName,
      card_expiration_data: bill_info.cardExpirationDate,
      card_cvc: bill_info.cardCVC
    });

  const reservationId = sessionStorage.getItem('reservationId');
  console.log(reservationId);

  await axios.post(`http://localhost:5000/add_bill_id_to_reservation/${reservationId}`,
    { bill_id: response.data.bill_id });

  // Stores customer information
  response = await axios.post(`http://localhost:5000/create_customer`,
    {
      first_name: customer_info.custFirstName,
      last_name: customer_info.custLastName,
      email: customer_info.custEmail,
      phone_number: customer_info.custPhoneNum,
      reservation_id: reservationId
    })

  const carId = sessionStorage.getItem('carId'); // Ensure 'carId' is stored in session storage
  if (!carId) {
    console.error('Car ID not found in session storage');
    return;
  }

  await axios.post(`http://localhost:5000/add_customer_id_to_reservation/${reservationId}`,
    { customer_id: response.data.id });

  await axios.put(`http://localhost:5000/set_car_rented/${carId}`, { rented: true })
}


function Rental() {
  const [reservation, setReservation] = useState(null);
  const [daysRented, setDaysRented] = useState(null);
  const [car, setCar] = useState(null);
  const [bill, setBill] = useState(null);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpirationDate, setCardExpirationDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [custFirstName, setCustFirstName] = useState('');
  const [custLastName, setCustLastName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhoneNum, setCustPhoneNum] = useState('');
  const [inPerson, setInPerson] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalCost, setFinalCost] = useState(0);

  useEffect(() => {
    const fetchReservationAndCar = async () => {
      try {
        const reservationId = sessionStorage.getItem('reservationId');
        const reservationResponse = await axios.get(`http://localhost:5000/reservation/${reservationId}`);
        setReservation(reservationResponse.data);

        const carId = sessionStorage.getItem('carId');
        const carResponse = await axios.get(`http://localhost:5000/get_car/${carId}`);
        setCar(carResponse.data);

        // Perform calculations after fetching data
        const startDate = new Date(reservationResponse.data.start_date);
        const endDate = new Date(reservationResponse.data.end_date);
        const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
        setDaysRented(days);

        const totalCost = carResponse.data.daily_cost * days;
        const taxRate = 0.0475; // North Carolina state sales tax rate
        const taxAmount = totalCost * taxRate;
        const finalCost = totalCost + taxAmount;

        setTotalCost(totalCost);
        setTaxAmount(taxAmount);
        setFinalCost(finalCost);
      } catch (error) {
        console.error('Error fetching reservation or car data:', error);
      }
    };

    fetchReservationAndCar();
  }, []);


  if (!reservation || !car) {
    return <div>Loading...</div>;
  }


  return (
    <div className="reservation-container">
      <h2>Review & Reserve</h2>
      <div className="details-container">
        <div>
          {/*Pick-up and Drop-off information*/}
          <div className="reservation-details-container container-style">
            <h4>Reservation Details</h4>
            <p>
              <b>Pick-up</b><br />
              {reservation.pickup_location} <br />
              {reservation.start_date}  <br />
              {formatTime(reservation.start_time)}  <br />
            </p>
            <p>
              <b>Drop-off</b><br />
              {reservation.dropoff_location} <br />
              {reservation.end_date}  <br />
              {formatTime(reservation.end_time)}  <br />
            </p>
            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white' }}
              fullWidth
            >
              Change Reservation
            </Button>
          </div>
          {/*Payment summary*/}
          <div className="payment-summary-container container-style">
            <h4>Payment Summary</h4>
            <p>
              <b>Rental Plan</b><br />
              Daily Unlimited
            </p>
            <div className="payment-summary-grid">
              <text className="grid-item">{`${car.make} ${car.model} x ${daysRented} days`}</text>
              <text className="grid-item">{`$${totalCost.toFixed(2)}`}</text>
              <text className="grid-item">Tax</text>
              <text className="grid-item">{`$${taxAmount.toFixed(2)}`}</text>
              <text className="grid-item"><b>Final Cost:</b></text>
              <text className="grid-item">{`$${finalCost.toFixed(2)}`}</text>
            </div>
          </div>
        </div>
        {/*Customer details & payment method*/}
        <div className="customer-info-container container-style">
          <div className="cust-details-container">
            <h4>Customer Details</h4>
            <form className="form-container">
              <label><b>First Name</b></label><br />
              <input
                type="text" className="form-field"
                value={custFirstName}
                onChange={(e) => setCustFirstName(e.target.value)} /><br />
              <label><b>Last Name</b></label><br />
              <input
                type="text"
                className="form-field"
                value={custLastName}
                onChange={(e) => setCustLastName(e.target.value)} /><br />
              <label><b>Email</b></label><br />
              <input
                type="text"
                className="form-field"
                value={custEmail}
                onChange={(e) => setCustEmail(e.target.value)} /><br />
              <label><b>Phone Number</b></label><br />
              <input
                type="text"
                className="form-field"
                value={custPhoneNum}
                onChange={(e) => setCustPhoneNum(e.target.value)} /><br />
            </form>
          </div>
          <div className="payment-method-container">
            <h4>Select Payment Method</h4>
            <div className="payment-choice">
              <div className="radio-button-container">
                <input
                  type="radio"
                  id="credit"
                  name="payment-type"
                  value="Credit Card"
                  onChange={() => setInPerson(false)}
                /><br />
                <label htmlFor="credit">Credit Card</label>
              </div>
              <div className="radio-button-container">
                <input
                  type="radio"
                  id="In-person"
                  name="payment-type"
                  value="In-person"
                  onChange={() => setInPerson(true)}
                /><br />
                <label htmlFor="In-person">In-person</label>
              </div>
            </div>
            <form className="form-container">
              <label><b>Name on Card</b></label><br />
              <input
                type="text"
                className="form-field"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              /><br />
              <label><b>Card Number</b></label><br />
              <input
                type="text"
                className="form-field"
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
              /><br />
              <label><b>Expiration Date</b></label><br />
              <input
                type="text"
                className="form-field"
                value={cardExpirationDate}
                onChange={(e) => setCardExpirationDate(e.target.value)}
              /><br />
              <label><b>CVC</b></label><br />
              <input
                type="text"
                className="form-field"
                value={cardCVC}
                onChange={(e) => setCardCVC(e.target.value)}
              /><br />
            </form>
            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white' }}
              fullWidth
              onClick={() => onFormFilled(
                {
                  finalCost: finalCost,
                  inPerson: inPerson,
                  creditCardNumber: creditCardNumber,
                  cardName: cardName,
                  cardExpirationDate: cardExpirationDate,
                  cardCVC: cardCVC
                },
                {
                  custFirstName: custFirstName,
                  custLastName: custLastName,
                  custEmail: custEmail,
                  custPhoneNum: custPhoneNum
                }
              )}
            >
              Reserve
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rental;
