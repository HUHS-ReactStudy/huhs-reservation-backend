import mongoose from 'mongoose';
import './model';

const connectDB = () => {
  if (process.env.MONGO_ATLAS_URI) {
    mongoose
      .connect(process.env.MONGO_ATLAS_URI)
      .then(() => console.log('✅ mongodb connected!'))
      .catch(error => console.error('🚫 mongodb connection error', error));
  }
};

connectDB();

mongoose.connection.on('disconnected', connectDB);
