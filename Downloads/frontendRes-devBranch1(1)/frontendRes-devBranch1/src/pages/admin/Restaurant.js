/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReusableTable from '../../components/ReusableTable';
import './index.css';
// import Sidebar from './Sidebar';

const RestaurantTable = () => {
  const headers = [
    'Sl No',
    'Restaurant Branch',
    'Opening Hours',
    'Restaurant Address'
  ];
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    navigate('/admin/create/restaurant');
  };

  const onEdit = (id) => {
    console.log(`Edit restaurant with ID ${id}`);
    // navigate(`/admin/updateRestaurant/${id}`);
    navigate(`/admin/updateRestaurant/${id}`);
  };

  const onDelete = async (menuId) => {
    try {
      // Make an Axios DELETE request to delete the product
      await axios.delete(`/api/restaurant/delete/${menuId}`);

      // Handle success, e.g., navigate to another page or show a success message
      toast('Product Deleted Successfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
      });

      // Optionally, navigate to another page after successful deletion
      // history.push('/some-other-page');
    } catch (error) {
      // Handle errors, e.g., show an error message
      toast(error.message || 'An error occurred', {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/restaurant/get'
        );
        const { data } = response;

        // Check if the response is successful and contains the expected structure
        if (data.success && Array.isArray(data.data)) {
          setRestaurants(data.data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h4 className=" mt-3" style={{ fontWeight: 'bold' }}>
          Restaurants
        </h4>
        <div className="col">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div style={{ display: 'flex' }}>
              <h5 className="mt-2">Create a new restaurant - </h5>
              <button className="btn m-1" onClick={handleAdd}>
                Create
              </button>
            </div>
          )}
        </div>
        <ReusableTable
          headers={headers}
          data={restaurants}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default RestaurantTable;
