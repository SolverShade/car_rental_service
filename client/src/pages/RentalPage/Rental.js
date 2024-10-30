import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Rental.css';
import Button from '@mui/material/Button';

function ReservationForm() {
  return(
    <form className="form-container">
      <label><b>Fist Name</b></label><br />
      <input type="text" className="form-field"/><br />
      <label><b>Last Name</b></label><br />
      <input type="text" className="form-field"/><br />
      <label><b>Email</b></label><br />
      <input type="text" className="form-field"/><br />
      <label><b>Phone Number</b></label><br />
      <input type="text" className="form-field"/><br />
    </form>
  )
}

function PaymentForm() {
  return(
    <form className="form-container">
      <label><b>Name on Card</b></label><br />
      <input type="text" className="form-field"/><br />
      <label><b>Card Number</b></label><br />
      <input type="text" className="form-field"/><br />
      <label><b>Expiration Date</b></label><br />
      <input type="text" className="form-field"/><br />
      <label><b>CVC</b></label><br />
      <input type="text" className="form-field"/><br />
    </form>
  )
}

function Rental() {
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
            Hope Mills, NC 28306 <br />
            October 20, 2024  <br />
            1:00 pm  <br />
            </p>
            <p>
            <b>Drop-off</b><br />
            Hope Mills, NC 28306  <br />
            October 26, 2024  <br />
            1:00 pm  <br />
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
              <text className="grid-item">Toyota Camry x 7 days</text>
              <text className="grid-item">$350.00</text>
              <text className="grid-item">Tax</text>
              <text className="grid-item">$16.63</text>
              <text className="grid-item"><b>Total Cost</b></text>
              <text className="grid-item">$366.63</text>
            </div>
          </div>
        </div>
        {/*Customer details & payment method*/}
        <div className="customer-info-container container-style">
          <div className="cust-details-container">
            <h4>Customer Details</h4>
            <ReservationForm></ReservationForm>
          </div>
          <div className="payment-method-container">
            <h4>Select Payment Method</h4>
            <div className="payment-choice">
              <div className="radio-button-container">
                <input type="radio" id="credit" name="payment-type" value="Credit Card"/><br />
                <label for="credit">Credit Card</label>
              </div>
              <div className="radio-button-container">
                <input type="radio" id="In-person" name="payment-type" value="In-person"/><br />
                <label for="In-person">In-person</label>
              </div>
            </div>
            <PaymentForm></PaymentForm>
            <Button
            variant="contained"
            style={{ backgroundColor: 'black', color: 'white' }}
            fullWidth
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
