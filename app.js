const express= require("express"); 
const shortId = require("shortid"); 
const createHttperror  = require("http-errors"); 
const mongoose = require("mongoose");
const shortURL = require('./model/url');
const app = express(); 
const path = require("path"); 
 app.use(express.static('public')); 
 app.set('views', path.join(__dirname , '/views')); 
 app.use(express.json()); 

 mongoose.connect("mongodb://localhost:27017/urlShortner", {useNewUrlParser:true , 
 useUnifiedTopology:true , useCreateIndex:true}).then(()=>{
     console.log(`connection is sucessfull`); 
 }).catch((e)=>{
     console.log(e); 
 }); 
 app.use(express.urlencoded({extended:false})); 
 app.set('view engine' , 'ejs')
app.get('/',(req,res)=>{
res.render("index"); 
})


app.post('/', async(req,res,next)=>{
try{
const {url}= req.body;
if(!url){
   
      throw createHttperror.BadRequest("provide url please"); 
} 
const ifexsit  = await shortURL.findOne({url}); 
if(ifexsit){
    res.render('index', {url_short :`http://localhost:8000/${ifexsit.shortId}`})
    return 
}
const shortUrl = new shortURL({url:url, shortId:shortId.generate()})
const result = await shortUrl.save(); 
res.render('index', {url_short :`http://localhost:8000/${result.shortId}`})
}catch(error){
res.render("index",{error:"provide the url link"})
}
})

app.get('/:shortId', async(req,res,next)=>{
    const shortId =req.params.shortId; 
    const result  = await shortURL.findOne({shortId}); 
    res.redirect(result.url); 
})


app.use((req,res,next)=>{
    next(createHttperror.NotFound()); 
})


app.use((req,res,next)=>{
  res.status(err.status||500);
  res.render('index', {error:err.message})  
})


const port = 8000; 
app.listen(port , ()=>{
    console.log(`aplication is started at port ${port}`); 
})
