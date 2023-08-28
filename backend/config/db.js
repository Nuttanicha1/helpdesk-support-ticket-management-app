import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To MongoDB Database ${conn.connection.host}`.bgYellow.black);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
};

export default connectDB;