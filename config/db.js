import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DB_NAME, DB_USER, DB_PASS } = process.env;

const db = async () => {
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@devcluster.kepoa.azure.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};

export default db;
