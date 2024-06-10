// import React, { useContext, useEffect, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../Context/StoreContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({ ...data, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = { ...item, quantity: cartItems[item._id] };
//         orderItems.push(itemInfo);
//       }
//     });

//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     };

//     try {
//       const response = await axios.post(`${url}/api/order/place`, orderData, {
//         headers: { token }
//       });

      
      

//       if (response.data.success) {
//         const { session_url } = response.data;
//         if (session_url) {
//           window.location.replace(session_url);
//         } else {
//           console.error('Session URL is undefined:', session_url);
//           alert('Payment URL is not available. Please try again later.');
//         }
//       } else {
//         alert('Order placement failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('An error occurred while placing the order. Please try again.');
//     }

  
//   };
// const naigate = useNavigate

//   useEffect(()=>{
// if (!token) {
//   naigate('/cart')
// }

// else if(getTotalCartAmount()==0)
//   {
//     naigate('/cart')
//   }
//   },[token])
//   return (
//     <form onSubmit={placeOrder} className="place-order">
//       <div className='place-order'>
//         <div className="place-order-left">
//           <p className='title'>Delivery Information</p>
//           <div className="multi-fields">
//             <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
//             <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
//           </div>
//           <input required type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' />
//           <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
//           <div className="multi-fields">
//             <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
//             <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
//           </div>
//           <div className="multi-fields">
//             <input required type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip Code' />
//             <input required type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
//           </div>
//           <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
//         </div>
//         <div className="place-order-right">
//           <div className="cart-total">
//             <h2>Cart Total</h2>
//             <div>
//               <div className="cart-total-details">
//                 <p>Subtotal</p>
//                 <p>₹{getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Delivery Fee</p>
//                 <p>₹{getTotalCartAmount() === 0 ? 0 : 39}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <b>Total</b>
//                 <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 39}</b>
//               </div>
//             </div>
//             <button type='submit'>PROCEED TO PAYMENT</button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;


import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = food_list.filter(item => cartItems[item._id] > 0)
                                .map(item => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 39,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        if (session_url) {
          window.location.replace(session_url);
        } else {
          console.error('Session URL is undefined:', session_url);
          alert('Payment URL is not available. Please try again later.');
        }
      } else {
        alert('Order placement failed. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        alert('An error occurred while placing the order. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First Name" />
          <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" />
        </div>
        <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email" />
        <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip Code" />
          <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
        </div>
        <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 39}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 39}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
