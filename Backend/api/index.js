const app = require('../src/app');
const connectDb = require('../src/db/db');

let dbConnected = false;

module.exports = async (req, res) => {
  try {
    if (!dbConnected) {
      await connectDb();
      dbConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      message: 'Database connection failed'
    });
  }
};