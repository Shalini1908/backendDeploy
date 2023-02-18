const express = require("express");
const jwt = require("jsonwebtoken")
const {NoteModel} = require("../model/Note.model")
const noteRouter = express.Router();

noteRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization
    if(token){
     jwt.verify(token,"masai",async (err,decoded)=>{
      const Id = decoded.userId; 
      const notes = await NoteModel.find({userId : Id})
      res.send(notes) 
     })  
  
    }
    else{
        res.send("Please Login")
     } 
 
})

noteRouter.post("/create",async(req,res)=>{
const payload = req.body   
const note = new NoteModel(payload)
await note.save()
res.send({"msg":"Notes Created"})
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
       if(userID_making_req!==userID_in_note){
           res.send({"msg":"You are not authorized"})
       }else{
           await NoteModel.findByIdAndDelete({"_id":id})
           res.send("Deleted the note")
       }
    
    }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
    }
})


noteRouter.patch("/update/:id", async(req,res)=>{
 const payload = req.body
 const id = req.params.id
 const note = await NoteModel.findOne({"_id":id})
 const userID_in_note=note.userID
 const userID_making_req=req.body.userID
 try{
    if(userID_making_req!==userID_in_note){
        res.send({"msg":"You are not authorized"})
    }else{
        await NoteModel.findByIdAndUpdate({"_id":id},payload)
        res.send("Updated the note")
    }
 
 }catch(err){
    console.log(err)
    res.send({"msg":"Something went wrong"})
 }
 
})

module.exports={
    noteRouter
}