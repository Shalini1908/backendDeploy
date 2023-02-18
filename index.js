const express = require("express");
const connection = require("./config/db")
const app = express();
const {userRouter} = require("./routes/User.routes")
const {noteRouter} = require("./routes/Note.routes");
const {authenticate} = require("./middleware/authenticate.middleware");
const cors = require("cors")
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
res.send("Welcome to my Website")

})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
try{
await connection
console.log("Connected to db")
}
catch(err){
console.log("Can't connect to db")
console.log(err)
}
    console.log(`Server is running at port ${process.env.port}`)
})