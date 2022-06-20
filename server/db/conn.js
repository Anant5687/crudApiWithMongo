const mongoose = require('mongoose')
const Db =  "mongodb+srv://anantJindal:5687Anant@cluster0.ckapw.mongodb.net/mernStack?retryWrites=true&w=majority"

mongoose.connect(Db).then(()=>console.log("connection created")).catch((err)=>console.log(err.message))