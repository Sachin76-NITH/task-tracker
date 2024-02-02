const mongoose =require("mongoose");
const bcrypt=require("bcrypt")
const UserSchema=new mongoose.Schema({
  
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is Required"],

    },
    // isAdmin:{
    //     type:Boolean,
    //     default:false,
    // },
    
    
},{timestamps:true});

UserSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.statics.Login = async function (email, password) {
    const user = await this.findOne({ email });
  
    if (user) {
      // Compare the entered password with the stored password directly
      if (password === user.password) {
        return user;
      } else {
        throw new Error("Incorrect password");
      }
    } else {
      throw new Error("Incorrect email");
    }
  };

module.exports=mongoose.model("Users",UserSchema);