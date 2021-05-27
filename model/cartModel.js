const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const cartSchema= new Schema({
        name:String,
        description:String,
        price:String,
        user:{
            type:Schema.Types.ObjectId,
            ref:"register"
        }
  
});  

module.exports=mongoose.model('cart',cartSchema);