const mongoose=require("mongoose");
require('dotenv').config()

const connectDb=async()=>{
  try {
    const conn= await mongoose.connect(
        process.env.MONGO_CONNECTION_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
    )

    console.log(`MonogoDB is connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

module.exports=connectDb;