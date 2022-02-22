const dotenv=require('dotenv')
const express=require('express');
const app=express();
const mongoose=require('mongoose')

dotenv.config({path:'./config.env'}) //Ones yoou write it in app.js no need to call everytime in other file
require('./db/conn');//Connnect to database
app.use(express.json())//to mmake app understang json
/*Connect database safely using env variable*/
/*const DB=process.env.DATABASE;

 mongoose.connect(DB,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
   console.log("connected to database succesully")
 }).catch((err)=>{
  console.log(err);
   console.log('connection failed');
 });*/




 /*Connect database directly*/ 
 //const DB='mongodb+srv://ashish:Ashish%40108@cluster0.twh2k.mongodb.net/mearnstack?retryWrites=true&w=majority';
/*mongoose.connect(db,{
      useNewUrlParser:true,
      useCreateIndex:true,
      useUnifiedTopology:true,
      useFindAndModify:false

}).then(()=>{
console.log('Connection sucessfull')
}).catch((err)=>console.log('not connected'));*/
//middleware 
//use for authentication of client request before loading pages from server
const User=require('./model/userSchema');//From module export of userSchema

/*Link the router file to from auth.js to app.js */
app.use(require('./router/auth'));

app.listen(3000,()=>{
  console.log('server running on 3000')
  
  });

/*const middleware=(req,res,next)=>{
      console.log('hello my middleware');
      next();// next is use to load the page after all the process of authentication


}
//middleware();





//starting server
app.get('/',(req,res)=>{
  res.send('hello from server')
});

app.get('/about',middleware,(req,res)=>{
    res.send('hello from about')
  });

  app.get('/contact',(req,res)=>{
    res.send('hello from contact')
  });

  app.get('/login',(req,res)=>{
    res.send('hello from login')
  });

  app.get('/signup',(req,res)=>{
    res.send('hello from signup')
  });
app.listen(3000,()=>{
console.log('server running on 3000')

});*/