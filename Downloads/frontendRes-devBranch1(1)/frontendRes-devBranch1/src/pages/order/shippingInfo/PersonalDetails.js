/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
// import SimpleReactValidator from 'simple-react-validator';
import './index.css';
import { Button, Card } from 'react-bootstrap';

const PersonalDetails = ({
  name,
  lastName,
  handleFirstNameChange,
  handleLastNameChange,
  handleGetOtp,
  handleOtpChange,
  emailOrMobile,
  handleEmailOrMobileChange,
  enteredOtp,
  isOtpSent,
  handleConfirmOtp,
  errors
}) => {
  // const [emailError, setEmailError] = useState('');
  // const validator = useRef(
  //   new SimpleReactValidator({ className: 'text-danger' })
  // );

  // const validateEmail = () => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     setEmailError('Invalid email address');
  //     return false;
  //   }
  //   setEmailError('');
  //   return true;
  // };

  // const handleEmailBlur = () => {
  //   validateEmail();
  // };

  return (
    <Card className="my-3 p-3">
      <h4>Personal Details</h4>
      <div className="mb-3 address-container">
        <label htmlFor="userName" className="form-label">
          First Name{' '}
          <span className="text-danger">
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          className={`form-control `}
          id="userName"
          value={name}
          onChange={handleFirstNameChange}
          placeholder="Field is required"
          required
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="lastName" className="form-label">
          Last Name{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          className={`form-control `}
          id="lastName"
          value={lastName}
          placeholder="Field is required"
          onChange={handleLastNameChange}
          required
        />
      </div>
      <div className="mb-3 address-container">
        <label htmlFor="emailOrMobile" className="form-label">
          Email / Mobile Number{' '}
          <span className="text-danger">
            {' '}
            <b>*</b>
          </span>
        </label>
        <input
          type="text"
          className="form-control"
          id="emailOrMobile"
          value={emailOrMobile}
          onChange={handleEmailOrMobileChange}
          required
          placeholder="Field is required"
        />
      </div>
      <Button
        type="button"
        className="my-global-button my-2"
        onClick={handleGetOtp}
      >
        Get OTP
      </Button>
      {isOtpSent && (
        <>
          <div>
            <label htmlFor="otp" className="form-label mt-4">
              Enter OTP{' '}
              <span className="text-danger">
                {' '}
                <b>*</b>
              </span>
            </label>
            <input
              type="tel"
              className={`form-control `}
              id="otp"
              value={enteredOtp}
              onChange={handleOtpChange}
              required
              placeholder="Field is required"
            />
          </div>
          <Button
            type="button"
            className="my-3 my-global-button"
            required
            onClick={handleConfirmOtp}
          >
            Confirm OTP
          </Button>
        </>
      )}
    </Card>
  );
};

export default PersonalDetails;
