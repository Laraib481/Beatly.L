// const app = require('../src/app');
// const connectDb = require('../src/db/db');

// connectDb();

// module.exports = app;



// const app = require('../src/app');
// const connectDb = require('../src/db/db');

// module.exports = async (req, res) => {
//   await connectDb();
//   return app(req, res);
// };

const app = require('../src/app');

module.exports = app;