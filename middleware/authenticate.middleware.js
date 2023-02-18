const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
   const decoded = jwt.verify(token ,"masai",(err,decoded)=>{
    if(decoded){
        const userID = decoded.userID
        req.body.userID=userID
        next()
    }else{
        res.send({"msg":"Please Login"})
    }
   })
    }else{
        res.send({"msg":"Please Login"})
    }
}

module.exports={
    authenticate
}


