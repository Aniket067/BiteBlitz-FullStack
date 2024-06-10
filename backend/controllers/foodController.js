// import foodModel from "../models/foodModel.js";
// import fs from 'fs'

// //adding the food item

// const addFood = async (req, res) => {

//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
//         image: image_filename
//     })
//     try {
//         await food.save();
//         res.json({ sucess: true, message: "Food Added" })
//     }
//     catch (error) {
//         console.log(error)
//         res.json({sucess:false,message:"Error"})
//     }
// }
//  /// all food list here
//  const listFood = async (req,res )=>{
//     try{
//         const foods= await foodModel.find({});
//         res.json({sucess:true,data:foods})
//     }
//     catch{
//         console.log(error);
//         res.json({sucess:false,data:"Error"})
//     }
//  }
//  //remove food itmes

// const removeFood = async (req,res)=>{

//      try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`,()=>{})
//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({sucess:true,message:"Food Removed"})
//      } catch (error) {
//         console.log(error)
//         res.json({sucess:false,message:"Error"})
//      }
// }
// export { addFood,listFood,removeFood }


import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Adding the food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food", error: error.message });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving foods", error: error.message });
    }
};

// Remove food items
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log(err);
            });
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Food Removed" });
        } else {
            res.json({ success: false, message: "Food not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food", error: error.message });
    }
};

export { addFood, listFood, removeFood };
