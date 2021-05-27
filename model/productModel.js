const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema= new Schema({
    name:String,
    description:String,
    price:String,
    file:String
});

module.exports=mongoose.model('product',productSchema);