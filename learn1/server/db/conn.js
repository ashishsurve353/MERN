const mongoose=require('mongoose')
const DB=process.env.DATABASE;

 mongoose.connect(DB,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
   console.log("connected to database succesully")
 }).catch((err)=>{
  console.log(err);
   console.log('connection failed');
 });