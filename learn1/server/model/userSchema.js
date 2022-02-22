const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
/*Define tructure of db*/
const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        work:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        cpassword:{
            type:String,
            required:true
        },
        tokens:[
            {
                  token:{    //array of token

                        type:String,
                         required:true
                  }  

        }
    ]

})




//hashing password before save using bcrypt package method
userSchema.pre('save',async function(next){
console.log("inside pre")
    if(this.isModified('password')){
          this.password=await bcrypt.hash(this.password,12); //12 is rounds of salting hashing
          this.cpassword=await bcrypt.hash(this.cpassword,12); 
    }
    next();

})
//Generating token
userSchema.methods.generateAuthToken=async function(){
     try{
    let mytoken=jwt.sign({_id:this._id},process.env.SECRET_KEY)//id is from database auto generated id for every object
    this.tokens=this.tokens.concat({token:mytoken})//storing token to db     
     await this.save()
     return mytoken;
}catch(err){
     console.log(err)

     }

}

const User=mongoose.model('USER',userSchema);//USER is name of collection
module.exports=User;//So we can use this user anywhere