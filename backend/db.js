const mongoose=require('mongoose');
mongoose.connect("tour mongodb cluster ")
.then(()=>{
    console.log("Connected to database")
})
.catch((err)=>{
    console.log("Error "+err.message);
})

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    fname : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lname : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password : {
        type: String,
        required: true,
        minLength: 6
    }
});
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const transactionSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})
const Account=mongoose.model('Account',accountSchema);
const User = mongoose.model("User",userSchema);
const Transaction=mongoose.model("Transaction",transactionSchema)
module.exports={
    User,
    Account,
    Transaction
}
