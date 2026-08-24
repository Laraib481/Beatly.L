const mongoose = require('mongoose');

async function connectDb(){
   
   try{

    await mongoose.connect(process.env.MONGO_URI);
    console.log('connect db successfully');
     
   }catch(err){
    console.log("database connection err", err);
   }

}



module.exports = connectDb;
