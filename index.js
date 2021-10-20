const express=require('express');
const app=express();
const multer=require('multer');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const Post=require('./models/Post')
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))
app.use(express.static(__dirname+"./public/"))

//multer config
const storage = multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
  
  const upload = multer({ storage: storage }).single('file')
mongoose.connect(process.env.MONGO_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true,
   
})
.then(console.log('mongo'))
.catch((err)=>{
console.log(err);
});

app.get("/",(req,res)=>{
    
    res.status(200).json("working")
})
app.post("/createPost",upload,async (req,res)=>{
    const newPost=new Post({
        text:req.body.text,
        imagePath:req.file.filename
    });
    try{
    const savedPost=await newPost.save();
    res.status(200).json(savedPost);
    
    }catch(err){
        res.status(500).json("Can't post");
    }
});

app.listen(5000,()=>{
    console.log("running");
})