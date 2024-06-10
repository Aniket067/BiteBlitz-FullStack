// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../Context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// const FoodDisplay = ({ category }) => {
//     const { food_list } = useContext(StoreContext)
//     return (
//         <div className='food-display' id='food-display'>
//             <h2>
//                 Top Dishes in Town
//             </h2>
//             <div className="food-display-list">
//                 {food_list.map((item, index) => {
//                     if (category==="All" || category===item.category) //select on catgeory gives that only
//                         {
                        
//                         return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}
//                         />
//                     }
//                 })}
//             </div>
//         </div>
//     )
// }

// export default FoodDisplay



import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    // Check if the food_list is available before trying to map over it
    if (!food_list) {
        // You can replace this with a loader or another placeholder
        return <div>Loading...</div>;
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>City's Best Bites</h2>
            <div className="food-display-list">
                {food_list.map(item => {
                    if (category === "All" || item.category === category) {
                        return (
                            <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
