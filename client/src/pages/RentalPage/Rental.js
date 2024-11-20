import 'bootstrap/dist/css/bootstrap.min.css';
import './Rental.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { formatTime } from '../../utility/DateUtils';
import { NotificationContainer, NotificationManager } from 'react-notifications';

async function onFormFilled(bill_info, customer_info) {
  let response = await axios.post(`http://localhost:5000/create_bill`, {
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

  await axios.post(`http://localhost:5000/add_bill_id_to_reservation/${reservationId}`, { bill_id: response.data.bill_id });

  response = await axios.post(`http://localhost:5000/create_customer`, {
    first_name: customer_info.custFirstName,
    last_name: customer_info.custLastName,
    email: customer_info.custEmail,
    phone_number: customer_info.custPhoneNum,
    reservation_id: reservationId
  });

  const carId = sessionStorage.getItem('carId');
  if (!carId) {
    console.error('Car ID not found in session storage');
    return;
  }

  await axios.post(`http://localhost:5000/add_customer_id_to_reservation/${reservationId}`, { customer_id: response.data.id });
  await axios.put(`http://localhost:5000/set_car_rented/${carId}`, { rented: true });

  NotificationManager.success('Success', 'Reservation Complete', 2000);
  window.location.href = '/';
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

  // Error states
  const [errors, setErrors] = useState({
    creditCardNumber: '',
    cardName: '',
    cardExpirationDate: '',
    cardCVC: '',
    custFirstName: '',
    custLastName: '',
    custEmail: '',
    custPhoneNum: ''
  });

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

  const validateInputs = () => {
    const newErrors = {};

    if (inPerson == false) {
      if (!creditCardNumber) {
        newErrors.creditCardNumber = 'Credit card number is required';
      } else if (!/^\d{16}$/.test(creditCardNumber)) {
        newErrors.creditCardNumber = 'Credit card number must be 16 digits';
      }

      if (!cardName) {
        newErrors.cardName = 'Card name is required';
      } else if (!/^[a-zA-Z\s]+$/.test(cardName)) {
        newErrors.cardName = 'Card name must contain only letters and spaces';
      }

      if (!cardExpirationDate) {
        newErrors.cardExpirationDate = 'Card expiration date is required';
      } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(cardExpirationDate)) {
        newErrors.cardExpirationDate = 'Card expiration date must be in MM/YY format';
      }

      if (!cardCVC) {
        newErrors.cardCVC = 'Card CVC is required';
      } else if (!/^\d{3,4}$/.test(cardCVC)) {
        newErrors.cardCVC = 'Card CVC must be 3 or 4 digits';
      }
    }

    if (!custFirstName) {
      newErrors.custFirstName = 'First name is required';
    } else if (!/^[a-zA-Z]+$/.test(custFirstName)) {
      newErrors.custFirstName = 'First name must contain only letters';
    }

    if (!custLastName) {
      newErrors.custLastName = 'Last name is required';
    } else if (!/^[a-zA-Z]+$/.test(custLastName)) {
      newErrors.custLastName = 'Last name must contain only letters';
    }

    if (!custEmail) {
      newErrors.custEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(custEmail)) {
      newErrors.custEmail = 'Email must be a valid email address';
    }

    if (!custPhoneNum) {
      newErrors.custPhoneNum = 'Phone number is required';
    } else if (!/^\d{10}$/.test(custPhoneNum)) {
      newErrors.custPhoneNum = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    console.log(Object.keys(newErrors).length);
    return Object.keys(newErrors).length === 0;
  };

  const handleReserve = () => {
    if (validateInputs()) {
      console.log('here');
      onFormFilled(
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
      );
    }
  };

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
                onChange={(e) => setCustFirstName(e.target.value)}
              /><br />
              {errors.custFirstName && <span className="error">{errors.custFirstName}</span>}
              <br />

              <label><b>Last Name</b></label><br />
              <input
                type="text"
                className="form-field"
                value={custLastName}
                onChange={(e) => setCustLastName(e.target.value)}
              /><br />
              {errors.custLastName && <span className="error">{errors.custLastName}</span>}
              <br />

              <label><b>Email</b></label><br />
              <input
                type="text"
                className="form-field"
                value={custEmail}
                onChange={(e) => setCustEmail(e.target.value)}
              /><br />
              {errors.custEmail && <span className="error">{errors.custEmail}</span>}
              <br />

              <label><b>Phone Number</b></label><br />
              <input
                type="text"
                className="form-field"
                value={custPhoneNum}
                onChange={(e) => setCustPhoneNum(e.target.value)}
              /><br />
              {errors.custPhoneNum && <span className="error">{errors.custPhoneNum}</span>}
              <br />
            </form>

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
                {errors.cardName && <span className="error">{errors.cardName}</span>}
                <br />

                <label><b>Card Number</b></label><br />
                <input
                  type="text"
                  className="form-field"
                  value={creditCardNumber}
                  onChange={(e) => setCreditCardNumber(e.target.value)}
                /><br />
                {errors.creditCardNumber && <span className="error">{errors.creditCardNumber}</span>}
                <br />

                <label><b>Expiration Date</b></label><br />
                <input
                  type="text"
                  className="form-field"
                  value={cardExpirationDate}
                  onChange={(e) => setCardExpirationDate(e.target.value)}
                /><br />
                {errors.cardExpirationDate && <span className="error">{errors.cardExpirationDate}</span>}
                <br />

                <label><b>CVC</b></label><br />
                <input
                  type="text"
                  className="form-field"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                /><br />
                {errors.cardCVC && <span className="error">{errors.cardCVC}</span>}
                <br />
              </form>
              <Button
                className='mt-4'
                variant="contained"
                style={{ backgroundColor: 'black', color: 'white' }}
                fullWidth
                onClick={handleReserve}
              >
                Reserve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rental;
