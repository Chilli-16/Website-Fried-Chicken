import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://KFCChicken:687453@cluster0.md33u.mongodb.net/food-del').then(()=>console.log("DB Connected"));
// }

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://KFCChicken:687453@cluster0.md33u.mongodb.net/food-del');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
    }
}
