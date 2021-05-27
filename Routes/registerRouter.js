"use strict";

const registerController=require('../Controller/registerController')
const productController=require('../Controller/productController');
const cartController=require('../Controller/cartController')

module.exports = [
    {
        method: "GET",
        path: "/",
        options: {
            auth: false
        },
        handler: (request, h) => {
            return h.view('index')
        }
    },
    {
        method: "POST",
        path: "/registration",
        options: {
            auth: false
        },
        handler:registerController.create
    },
    {
        method: "GET",
        path: "/registerPage",
        options: {
            auth: false
        },
        handler: (request, h) => {
            return h.view('Registration')
        }
    },
    {
        method: "GET",
        path: "/loginPage",
        options: {
            auth: false
        },
        handler: (request, h) => {
            return h.view('login')
        }
    },
    {
        method: "POST",
        path: "/loginUser",
        options: {
            auth: {
                mode: 'try'
            }
        },
        handler: registerController.checkLogin
    },
    {   method: 'POST',
        path: '/prodUpload', 
        options: {
            auth:false,
            payload: {
              maxBytes: 209715200,
              output: 'stream',
              parse: true,
              multipart: true     // <-- this fixed the media type error
            },
        },
        handler: productController.create
    },
    {
        method: "GET",
        path: "/addToCart/{id}",
        options: {
            auth: false
        },
        handler:cartController.findOne
    },
    {
        method: 'GET',
        path: '/viewCart/{id}', 
        options: {
            auth: false
        },
        handler:cartController.findTotal
    },  
    {
        method: 'POST',
        path: '/addTCart', 
        options: {
            auth: false
        },
        handler:cartController.addToCart
    }, 
    {
        method: 'GET',
        path: '/image/{file*}',
        options: {
            auth: false
        },
        handler: {
          directory: { 
            path: 'public/images',
            listing: true
          }
        }

    } 
 
                                                       
];  