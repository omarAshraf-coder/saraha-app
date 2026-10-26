import mongoose from 'mongoose';

export const connectDB = async () => {
    return await mongoose.connect('mongodb+srv://portalrumble123_db_user:753699@cluster0.hfqtkqe.mongodb.net/saraha')
        .then(() => {
            console.log('Database connected successfully!');
        })
        .catch((err) => {
            console.log(`Database connection failed: ${err}`);
        });
};