import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div classname="allign-items-center">
      <h1 className="text-center"> Car Rental Application Skeleton</h1>
      <div className="d-flex
      justify-content-center
      align-items-center
      vh-100"
        style={{ height: '100vh' }}>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary mr-2">
            Signup/Login
          </button>
          <button
            type="button"
            className="btn
        btn-primary
        ml-2">
            View Cars
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
