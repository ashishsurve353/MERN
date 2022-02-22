const express=require('express')
const bcrypt=require('bcryptjs')
const router=express.Router();
const jwt=require('jsonwebtoken')
const User=require('../model/userSchema')

require('../db/conn')
const middleware=(req,res,next)=>{
    console.log('hello my middleware');
    next();// next is use to load the page after all the process of authentication


}
//middleware();





//starting server
router.get('/',(req,res)=>{
res.send('hello from server')
});

router.get('/about',middleware,(req,res)=>{
  res.send('hello from about')
});

router.get('/contact',(req,res)=>{
  res.send('hello from contact')
});

router.get('/login',(req,res)=>{
  res.send('hello from login')
});

router.get('/signup',(req,res)=>{
  res.send('hello from signup')
});

//Post API using promises line then()
/*router.post('/register',(req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    if(!name|| !email || !phone || !work || !password || !cpassword)
    {
        return res.json({error:"plz fill field properly"})
    }
    User.findOne({email:email}).then((userExist)=>{
      if(userExist){
        return res.status(422).json({error:"Email already exist"})
      }
      const user=new User({name,email,phone,work,password,cpassword})
      user.save().then(()=>{
        res.status(201).json({message:"User reggistered successfully"})

    }).catch((err)=>res.status(500).json({message:"not registered"}))
    }).catch(err=>{console.log(err)});
   
   
    //console.log(req.body);
  //  res.json({message:req.body})
    //send("My register page")
});*/

//Post API With Async Await
router.post('/register',async (req,res)=>{
  const {name,email,phone,work,password,cpassword}=req.body;
  if(!name|| !email || !phone || !work || !password || !cpassword)
  {
      return res.json({error:"plz fill field properly"})
  }

  try{
    const userExist=await User.findOne({email:email});
    if(userExist){
      return res.status(422).json({error:"Email already async exist"})
    }
    const user=new User({name,email,phone,work,password,cpassword})
   
   //hashing function from userschema will automatically called here before save
    const usereg=await user.save();
   if(usereg)
    {
       res.status(201).json({message:"User reggistered successfully"})
  }else{

    res.status(500).json({message:"not registered"})
  }

  }catch(err){
    console.log(err)

  }

  
 
 
  //console.log(req.body);
//  res.json({message:req.body})
  //send("My register page")
});



//Login API

router.post('/signup',async (req,res)=>{
        const {email,password}=req.body;
        if( !email || !password )
        {
            return res.json({error:"plz fill field properly"})
        }

        try{
          let token;
          const userLogin=await User.findOne({email:email});
             if(userLogin){

              const ismatch= await bcrypt.compare(password,userLogin.password);
              const token= await userLogin.generateAuthToken();
              console.log(token);
              res.cookie("jwtoken",token,{
                   expires:new Date(Date.now()+25892000000),//expiires in 30 days i.e. 25892000000 milliseconds
                  httpOnly:true
                  });
              if(!ismatch){
                 res.status(400).json({error:"Email/password not exist"})
              }else{
    
             console.log(userLogin)
             res.json({message:"User signup successfully"})
              }

             }else{
              res.status(400).json({error:"Email not exist"})
             }

          
        }catch(err){


        }


})

module.exports=router;