const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const regSchema= new Schema({
    name:String,
    email:String,
    password:String,
    cart:[{
        qty:String,
        type:Schema.Types.ObjectId,
          
    }]
});

module.exports=mongoose.model('reg',regSchema);