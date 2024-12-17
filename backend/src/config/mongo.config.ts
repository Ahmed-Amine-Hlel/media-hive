import mongoose from 'mongoose';

export async function connectDatabase() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        throw error;
    }
}
