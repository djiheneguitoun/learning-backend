
const { request, response } = require('express');
const express = require('express');
const mongoose =require('mongoose')
const url="mongodb://127.0.0.1:27017/mynewdb"
const app=express();
app.use(express.json());








//db conection
mongoose.set('strictQuery', false);
mongoose.connect(url,{}).then(result=>console.log("connect"))
.catch(err=>console.log(err))




//schema
const sch={
name:String,
auteur:String,
content:String,
}
const mymodel=mongoose.model("newcol",sch);




// app.post("/",async(request,response)=>{
//     console.log("inside")
//     const data=new mymodel({
//         auteur:request.body.auteur,
//         content:request.body.content,
//         name:request.body.name,
//     })
      
//     const isexistingName = await mymodel.find({ name: request.body.name })
//     if (isexistingName) {
//         response.status(400).json({ message: "This userName is already exist" })
//     }
//     else {
//         await data.save()  //nsnew
//         response.send("hello")
//     }
    
// })

// app.post("/", async (request, response) => {
//     const newPost = new mymodel({
//         auteur:request.body.auteur,
//        content:request.body.content,
//          name:request.body.name
//     })

//     const isexistingName = await mymodel.find({ name: request.body.name })
//     if (isexistingName) {
//         response.status(400).json({ message: "This userName is already exist" })
//     }
//     else {
//         //await tmshi ghir mea async
//         await newPost.save()  //nsnew
//         response.send("hello")
//     }
// })


app.post("/",async(req,res)=>{
    console.log("inside")

    const data=new mymodel({
        name:req.body.name,
        auteur:req.body.auteur,
        content:req.body.content
    })

    const val=await data.save();
    res.send("posted");
})




app.get("/",async(request,response)=>{
    try{const allposts= await mymodel.find({});
    response.status(200).send(allposts);}
    catch(err){
        response.status(404).json(err.massage);
    }
    
})


app.put("/:id",async(request,response)=>{
    //rechercher les ids
    const id = request.params.id;
const getPost =await mymodel.findByIdAndUpdate(id,{
    name:request.body.name
},{new: true})
response.status(200).json(getPost)

 })

 


app.delete("/:id", async (request, response) => {
    const id = request.params.id //wela const {id}  =request.params
    const isexistingPost = await mymodel.findByIdAndDelete(id, { new: true })
    console.log(isexistingPost)
    if (!isexistingPost) {
        return response.status(200).json({
            message: "the post is not existing"
        })
    }
    response.status(200).json({
        message: "the post has been deleted successfuly"
    })
})


app.listen(8000,()=>{
    console.log("hii");
})



