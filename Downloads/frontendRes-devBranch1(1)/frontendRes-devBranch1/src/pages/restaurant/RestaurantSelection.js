/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './ProductModal.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const RestaurantSelection = () => {
  const [restaurantId, setRestaurantId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [branch, setBranch] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const navigate = useNavigate();
  const generateDates = (numDays) => {
    const dates = [];
    const today = new Date();

    // const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      dates.push(formattedDate);
    }

    return dates;
  };

  const availableDates = generateDates(7);
  const formatAddress = (address) => {
    return `${address.line1}, ${address.city}, ${address.state} - ${address.postalCode}, ${address.country}`;
  };

  const handleRestaurantIdChange = (e) => {
    const selectedRestaurantId = e.target.value;

    // Find the selected restaurant based on the restaurantId
    const selectedRestaurant = restaurant.find(
      (r) => r.restaurantId === parseInt(selectedRestaurantId, 10)
    );

    if (selectedRestaurant) {
      // Set the ZIP code as the restaurantId
      setRestaurantId(selectedRestaurantId);

      // Optionally, you can set the full address in a separate state variable
      const fullAddress = formatAddress(selectedRestaurant.address);
      setFullAddress(fullAddress);
      const branch = selectedRestaurant.restaurantBranch;
      setBranch(branch);
    }
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    console.log(setSelectedDate);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (restaurantId && selectedDate && selectedTimeSlot) {
      // Store data in localStorage
      localStorage.setItem('restaurantId', restaurantId);
      localStorage.setItem('selectedDate', JSON.stringify(selectedDate));
      localStorage.setItem(
        'selectedTimeSlot',
        JSON.stringify(selectedTimeSlot)
      );
      localStorage.setItem('Address', JSON.stringify(fullAddress));
      localStorage.setItem('branch', JSON.stringify(branch));
      localStorage.removeItem('cartItems');

      // Navigate to the menus page using useNavigate
      navigate(`/home`);
    } else {
      // Show an error toast message
      toast.error('Please select restaurant, time and delivery date.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  useEffect(() => {
    // Fetch time slots from the API
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurant/get');
        const restaurant = response.data.data;
        // const timeSlotsData = Array.isArray(response.data) ? response.data : [];
        console.log(restaurant);
        setRestaurant(restaurant);
      } catch (error) {
        console.error('Error fetching time slots:', error.message);
      }
    };

    fetchRestaurants();
  }, [selectedDate]);
  useEffect(() => {
    // Fetch time slots from the API
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.post('/api/timeSlots', { restaurantId });
        const timeSlotsData = response.data.timeSlots;
        setTimeSlots(timeSlotsData);
      } catch (error) {
        console.error('Error fetching time slots:', error.message);
      }
    };

    if (restaurantId) {
      fetchTimeSlots();
    }
  }, [restaurantId]);
  return (
    <div>
      <Card className="col-11 mx-auto mt-5">
        <Card.Body>
          <div className="d-flex justify-content-start">
            <button onClick={handleGoBack} className="btn" type="button">
              <FaArrowLeft /> Back
            </button>
          </div>
          <Card.Title>Select Restaurant</Card.Title>
          <Form className="container">
            <Form.Group controlId="formrestaurantId">
              <Form.Select
                value={restaurantId}
                className="container"
                onChange={handleRestaurantIdChange}
                aria-label="Select ZIP Code"
              >
                <option className="container" value="">
                  Select a RestaurantBranch
                </option>
                {restaurant &&
                  restaurant.map((restaurant) => (
                    <option
                      className="container"
                      key={restaurant._id}
                      value={restaurant.restaurantId}
                    >
                      {restaurant.restaurantBranch} -{' '}
                      {formatAddress(restaurant.address)}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Body>
          <div className="modal-body">
            <Card.Title>Order Date</Card.Title>
            {/* You would generate the following buttons dynamically based on available dates */}
            <div className="date-buttons">
              {availableDates.map((date) => (
                <Button
                  key={date}
                  onClick={() => handleDateSelection(date)}
                  variant="outline-danger"
                  style={{
                    backgroundColor:
                      selectedDate === date ? 'green' : 'transparent',
                    color: selectedDate === date ? 'white' : 'black',
                    border:
                      selectedDate === date
                        ? '2px solid black'
                        : '1px solid #ccc'
                  }}
                >
                  {date}
                </Button>
              ))}
            </div>
          </div>
        </Card.Body>
        <Card.Body>
          <div className="modal-body">
            <Card.Title>Order Time</Card.Title>
            <Form.Select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
            >
              <option value="" disabled>
                Select a time
              </option>
              {timeSlots.map((slot) => (
                <option key={slot._id} value={slot.slot}>
                  {slot.slot}
                </option>
              ))}
            </Form.Select>
          </div>
        </Card.Body>
        <div className="modal-footer">
          <button className="btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </Card>
    </div>
  );
};

export default RestaurantSelection;
