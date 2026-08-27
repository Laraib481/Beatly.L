// const mongoose = require('mongoose');

// async function connectDb(){
   
//    try{

//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('connect db successfully');
     
//    }catch(err){
//     console.log("database connection err", err);
//    }

// }



// module.exports = connectDb;

const mongoose = require('mongoose');

let isConnected = false;

async function connectDb() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);

  isConnected = true;
  console.log('MongoDB connected successfully');
}

module.exports = connectDb;