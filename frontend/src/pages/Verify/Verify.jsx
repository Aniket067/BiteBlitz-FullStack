
import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      console.log('Verify Payment Response:', response.data);
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
