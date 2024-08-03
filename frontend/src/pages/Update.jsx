import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import React, { useEffect, useState } from 'react'
import { Button } from "../components/Button"
import { getUsername, updateUser } from "../services/api"

const Update = () => {
    const [updateBody,setUpdateBody]=useState({
        password:'',
        fname:'',
        lname:''
    })
    useEffect(()=>{
        const g=async()=>{
            await getUsername()
            .then(res=>{
                setUpdateBody({...updateBody,
                    fname:res.data.name,
                    lname:res.data.lname,
                    password:res.data.password
                })
                console.log(res.data)
            })
        }
        g()

    },[])
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Update Profile"}/>
                <SubHeading label={"Enter Details you want to change"}/>
                <InputBox value={updateBody.fname} label={"First Name(Optional)"} onChange={(e)=>{
                    setUpdateBody({...updateBody,fname:e.target.value})
                }} />
                <InputBox value={updateBody.lname} label={"Last Name(Optional)"} onChange={(e)=>{
                    setUpdateBody({...updateBody,lname:e.target.value})
                }} />
                <InputBox value={updateBody.password} label={"Password(Optional)"} onChange={(e)=>{
                    setUpdateBody({...updateBody,password:e.target.value})
                }} />
                <div className="pt-4">
                    <Button onClick={async()=>{
                        await updateUser(updateBody)
                        .then(res=>{
                           console.log(res.data.message)
                        })
                    }} label={'Update'}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Update
