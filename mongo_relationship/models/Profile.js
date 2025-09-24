const mongoose = require('mongoose');


const profileSchema=new mongoose.Schema({
    bio:String,
    hobbies:[String],
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        unique:true

    }
})

module.exports=mongoose.model('Profile',profileSchema);