import mongoose from "mongoose";
 export const connectDB =  async()=>{
    await mongoose.connect('mongodb+srv://aniketgupta:aniketgupta1@cluster0.tsgrk2q.mongodb.net/Food_Delivery').then(()=> console.log("Db Connected"));
}