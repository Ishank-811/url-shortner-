
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    shortId: { type: String,
    required: true ,
    unique:true ,
    trim:true 
   },
   url :{
     type:String, 
     required:true,

   }, 
    createdAt:{
    type:Date, 
    default:Date.now(),  
  } 
 

});

module.exports = mongoose.model('url', urlSchema);