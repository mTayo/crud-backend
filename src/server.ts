import app from './app';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;
dotenv.config({
  path: path.resolve(__dirname, `../.env.${env === 'development' ? 'development' : ''}`)
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

