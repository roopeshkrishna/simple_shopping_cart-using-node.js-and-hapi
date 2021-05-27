'use strict'
const cart=require('../model/cartModel');
const product=require('../model/productModel');
const register=require('../model/registerModel')
var ObjectId = require('mongodb').ObjectID;



module.exports = {

    async findOne(req, reply) {
        const find=await new Promise(function(resolve,reject){
         if (!req.params.id) {
             return reply({err: 'id is required param'}).code(400);
         }
         product.findById(req.params.id, (err, company) => {
             if (err) {
                 return reply(err).code(404);
             }
             resolve(company)
         })
 
        })
        cart.create({
            name:find.name,
            description:find.description,
            price:find.price,
        },(saveUser)=>{
            return saveUser 
        });
        console.log(find.name)
        return 'added to cart'                                                                                                          
    },
    async find(req, reply) {
        const data=await new Promise(function(resolve,reject){
         cart.find({}, (err, companies) => {
             if (err) {
                 return reply(err).code(404);
             }
             resolve(companies)     
         })
        })
        const value=await new Promise((resolve,reject)=>{
            var arr=[];
            for(var x in data){
                arr.push(data[x].price)
            }
            var arr1=[];
            arr1 = arr.map(Number);
            resolve(arr1); 
        })
        const price=await new Promise((resolve,reject)=>{
            var sum=0
            for(var i=0;i<value.length;i++){
                sum=sum+value[i]
            }
            resolve(sum)
        })
        return reply.view('cart',{data,price});
    },



    async addToCart(req, reply) {
        console.log('working')
       var userId=req.payload.userId
        console.log("hai"+userId)
        var proId=req.payload.productId
        console.log("yesss"+proId)
        
        let attributes = {};
 
        if (req.payload.productId) {
            attributes.cart=req.payload.productId 
        }
        var atr = { _id:req.payload.productId ,qty:1 };
        var quantity={qty:1}
        
        register.findOneAndUpdate({ _id: req.payload.userId }, 
            { $push: { 

                cart:[{
                    qty:quantity,
                    _id:ObjectId(req.payload.productId),
                   

                }] 

            } },
           function (error, success) {
                 if (error) {
                     console.log(error);
                 } else {
                     console.log(success);
                 }
             });
         
   console.log("done")
        return 'added to cart'  
    },   


    async findTotal(req, reply) {

        const value=await new Promise((resolve,reject)=>{
            
            register.aggregate([
                {
                  $lookup:
                    {
                        
                      from: "products",
                      localField: "cart",
                      foreignField: "_id",
                      as: "data"
                    }
               }
             ],(err,saveUser)=>{           
                  if(err){
                return reply(err).code(500);
            }   
                resolve(saveUser)
             })    
        })
        console.log("value data"+value)
       const data =await new Promise((resolve,reject)=>{
        var userId=req.params.id
        console.log(userId)
        for(var x in value){
            if(value[x]._id == userId ){
                console.log("haii"+value[x].data)
                resolve(value[x].data)
            }

        }

       })
       const price=await new Promise((resolve,reject)=>{
        var arr=[];
        for(var x in data){
            arr.push(data[x].price)
        }
        var arr1=[];
        arr1 = arr.map(Number);
        resolve(arr1); 
    })
    const amount=await new Promise((resolve,reject)=>{
        var sum=0
        for(var i=0;i<price.length;i++){
            sum=sum+price[i]
        }
        resolve(sum)
    })
        console.log(data)
       return reply.view('cart',{amount,data}) 
    },
    
    
}              