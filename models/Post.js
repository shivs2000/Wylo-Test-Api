const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
 
 text:{
     type:String,
     required:true
 },
 imagePath:{
     type:String,
     required:false,
 },


},{timestamps:true})

module.exports=mongoose.model('Post',PostSchema);