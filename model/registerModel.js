const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const registerSchema= new Schema({
    name:String,
    email:String,
    password:String,
    cart:[{
        qty:String,
        type:Schema.Types.ObjectId,
      
    }]
},{ autoIndex: false });

module.exports=mongoose.model('register',registerSchema);