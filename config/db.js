const mongoose=require("mongoose");
const {MONGO_CONNECTION_URL}=require("./keys.js")

const connectDb=async()=>{
  try {
    const conn= await mongoose.connect(
        MONGO_CONNECTION_URL,
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