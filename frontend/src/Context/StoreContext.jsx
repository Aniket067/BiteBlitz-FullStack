// // import { createContext, useEffect, useState } from "react";
// // import { food_list } from "../assets/assets";
// // import axios from "axios";
// // // context API
// // export const StoreContext = createContext(null)

// // const StoreContextProvider = (props) => {
// //     const [cartItems, setCartItems] = useState({})
// //     const url = "http://localhost:4000"
// //     const [token, setToken] = useState("")
// //     const [food_list, setFoodList] = useState([])

// //     //on  adding item 1st time to cart>>>
// //     const addToCart = async (itemId) => {
// //         if (!cartItems[itemId]) {
// //             setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
// //         }
// //         else {
// //             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
// //         }
// //         if (token) {
// //             await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            
// //         }

// //     }//Remove
// //     const removeFromCart = async(itemId) => {
// //         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

// //         if(token){
// //             await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            
// //         }
// //     }

// //     const getTotalCartAmount = () => {
// //         let totalAmount = 0;
// //         for (const item in cartItems) {
// //             if (cartItems[item] > 0) {
// //                 let itemInfo = food_list.find((product) => product._id === item);
// //                 totalAmount += itemInfo.price * cartItems[item];

// //             }


// //         }
// //         return totalAmount
// //     }
// //     //fetch food list from backend
// //     const fetchFoodList = async () => {
// //         const response = await axios.get(url + "/api/food/list");
// //         setFoodList(response.data.data)
// //     }

// //      const loadCartData= async(token)=>{
// //         const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
// //         setCartItems(response.data.cartData);
     
// //      }

// //     useEffect(() => {
// //         async function loadData() {
// //             await fetchFoodList();
// //             if (localStorage.getItem("token")) {
// //                 setToken(localStorage.getItem("token"))
// //                 loadCartData(localStorage.getItem("token"))

// //             }
// //         }//7:40
// //         loadData();
// //     }, [])

// //     const contextValue = {
// //         food_list,
// //         cartItems,
// //         setCartItems,
// //         addToCart,
// //         removeFromCart,
// //         getTotalCartAmount,
// //         url,
// //         token,
// //         setToken
// //     }
// //     return (
// //         <StoreContext.Provider value={contextValue}>
// //             {props.children}
// //         </StoreContext.Provider>
// //     )
// // }
// // export default StoreContextProvider

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// // context API
// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const url = "http://localhost:4000";
//   const [token, setToken] = useState("");
//   const [food_list, setFoodList] = useState([]);

//   //on adding item 1st time to cart
//   const addToCart = async (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//     if (token) {
//       await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (token) {
//       await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         if (itemInfo) {  // Check if itemInfo is defined
//           totalAmount += itemInfo.price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   // Fetch food list from backend
//   const fetchFoodList = async () => {
//     const response = await axios.get(url + "/api/food/list");
//     setFoodList(response.data.data);
//   };

//   const loadCartData = async (token) => {
//     const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
//     setCartItems(response.data.cartData);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       if (localStorage.getItem("token")) {
//         setToken(localStorage.getItem("token"));
//         loadCartData(localStorage.getItem("token"));
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// }

// export default StoreContextProvider;

import { createContext, useEffect, useState } from "react";
import axios from "axios";

// context API
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodList] = useState([]);

  // On adding item 1st time to cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {  // Check if itemInfo is defined
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch food list from backend
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error('Error loading cart data:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        // Optionally clear the token and redirect to login page
        setToken('');
        localStorage.removeItem('token');
        // Redirect to login page if required
      } else {
        alert('An error occurred while loading cart data. Please try again.');
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (token) {
        await loadCartData(token);
      }
    }
    loadData();
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
