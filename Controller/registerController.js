'use strict'
const register=require('../model/registerModel')
const product=require('../model/productModel')
const bcrypt=require('bcrypt');


let changePassword=async(pass)=>{
    try{
        const salt= await bcrypt.genSalt(8); 
        const hashedPassword= await bcrypt.hash(pass,salt)
        return hashedPassword
    }catch(error){
        console.log(error)
    }  
}
const account = [
    {
        id: '2133d32a'
    }
  ];
module.exports={

    async create(req,h){

        var pass=req.payload.password;
        var bpassword = await changePassword(pass)
          console.log(req.payload.email)
       
        try {
            const person = await register.findOne({ email: req.payload.email });
            if (person) {
              return "email already exist"

            } else {
              register.create({                      
                    name:req.payload.name,
                    email:req.payload.email,
                    password:bpassword,
                },(err,saveUser)=>{
                    if(err){
                        return reply(err).code(500);
                    }
                    return saveUser 
                });  
            return 'success :' 
            }
          } catch (error) {
            console.log(error);
            throw error
          }  
       
    },

    async checkLogin(req, h){
        console.log("user : "+req.payload.email)
        console.log("pass : "+req.payload.password)
        try {
          const person = await register.findOne({ email: req.payload.email });
          if (person) {
            const cmp = await bcrypt.compare(req.payload.password, person.password);
            if (cmp) {
                const value=await new Promise(function(resolve,reject){
                    product.find({}, (err, companies) => {
                        if (err) {
                            return reply(err).code(404);
                        }
                        resolve(companies)          
                    })
                   })
                req.cookieAuth.set({ id: account.id });
                var userId=person.id;
                console.log("hhhh"+userId)
              return h.view('home',{value,userId})
              
            } else {
                var not_pass="wrong password"
              return h.view('login',{not_pass})
            }
          } else {
            var not_pass="user does not exist"
            return h.view('login',{not_pass})
          }
        } catch (error) {
          console.log(error);
          throw error
        }
    },

}                  