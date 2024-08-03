const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account ,Transaction } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
	fname: zod.string(),
	lname: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    fname: zod.string().optional(),
    lname: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    try{
        await User.updateOne({ _id:req.userId},req.body)
        res.json({
            message: "Updated successfully"
        })
    }catch(e){
        console.error("Error updating user:", e);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

router.get("/bulk", async (req, res) => {
    try{
        const filtered = req.query.filter || "";
        const filter=filtered.toLocaleLowerCase()
        const token=req.headers.authorization.split(" ");
        const decodedToken=jwt.decode(token[1])
        const usrId=decodedToken.userId

        const users = await User.find({
            _id:{$ne:usrId},
            $or: [{
                fname: {
                    "$regex": filter,
                    "$options":"i"
                }
            }, {
                lname: {
                    "$regex": filter,
                    "$options":"i"
                }
            }]
        })
        
        res.json({
            user: users.map(user => ({
                username: user.username,
                fname: user.fname,
                lname: user.lname,
                _id: user._id
            }))
        })
    }catch(error){
        res.status(500).json({ error: "Internal server error" })
    }
})
router.get('/transaction',async(req,res)=>{
    const token=req.headers.authorization.split(" ");
    const decodedToken=jwt.decode(token[1])
    const usrId=decodedToken.userId
    const result=await Transaction.find({
        $or:[
            {senderId:{$in:usrId}},
            {receiverId:{$in:usrId}}
        ]
    })
    res.json(result)
})

router.get('/username',async(req,res)=>{
    const token=req.headers.authorization.split(" ");
    const decodedToken=jwt.decode(token[1])
    const usrId=decodedToken.userId
    const user=await User.findOne({_id:usrId})
    res.json({
        name:user.fname,
        lname:user.lname,
        password:user.password
    })
})

module.exports = router;