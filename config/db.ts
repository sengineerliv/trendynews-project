import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect('MONGO_URL')
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}
export default dbConnect;