const express=require('express');
const {authMiddleware}=require('../middleware');
const mongoose=require('mongoose')
const { Account , Transaction , User} = require('../db');
const router=express.Router();
router.get('/balance',authMiddleware,async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });
    res.json({
        balance:account.balance
    })
});
router.post('/transfer',authMiddleware,async (req,res)=>{
        const session=await mongoose.startSession();
        try{
            session.startTransaction();
            let {amount,to}=req.body;
            const fromm=(await getNames(req.userId)).toString()
            const too=(await getNames(to)).toString()
            amount=parseFloat(amount)
            const account=await Account.findOne({userId:req.userId}).session(session);
            if(!account || account.balance<amount){
                await session.abortTransaction();
                return res.status(400).json({
                    message:'Insufficient Balance'
                })
            }
            const toAccount=await Account.findOne({userId:to}).session(session);
            if(!toAccount){
                await session.abortTransaction();
                return res.status(400).json({
                    message:'Invalid Account'
                })
            }
            await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
            await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
            await Transaction.create({senderId:req.userId, receiverId:to , from:fromm, to:too, amount:amount,date:Date.now()})
            await session.commitTransaction();
            res.json({
                message:"Transaction Successful"
            })
        }catch(err){
            await session.abortTransaction();
             res.status(400).json({ message: err.message });
        }finally{
            session.endSession()
        }
})
const getNames=async(id)=>{
    const result=await User.findOne({_id:id})
    return result.fname+" "+result.lname;
}
module.exports=router;