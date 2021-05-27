'use strict'
const product=require('../model/productModel');
const hapi=require('hapi')
const fs=require('fs')

const  handleFileUpload = async file   => {

    return new  Promise (async(resolve, reject) => {
        console.log(file)
        const filename  = await file.hapi.file
        const data = await file._data
        fs.writeFile('./public/' + filename, data, err => {
            if (err) {
              reject(err)                
            }
            resolve({ message: 'Upload successfully!' })
          })

    setTimeout(async function(){ 
      fs.rename('./public/undefined','./public/images/'+file.hapi.filename,function(err){
        if(err) throw err;
        console.log('file renamed')
      })

    },2000)
    })    
} 


module.exports = {
    async create(req, reply) {
        console.log(req.payload.name)
        console.log(req.payload.file.hapi.filename)
        var img=req.payload.file.hapi.filename
      
        await handleFileUpload(req.payload.file);
       
        const response=await new Promise(function(resolve,reject){
          product.create({
              name: req.payload.name,
              description: req.payload.description,
              price: req.payload.price,
              file:img  
          }, (err, data) => {
              if (err) {
                  return reply(err).code(500);
              }
              resolve(data)
          });
        })
        
        return reply.response(response);   
             
     },
   

}