import {Heading} from '../components/Heading'
import {Button} from '../components/Button'
import { SubHeading } from "../components/SubHeading"
import {InputBox} from '../components/InputBox'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import { signup } from '../services/api'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const [userData,setUserData]=useState({
    fname:'',
    lname:'',
    username:'',
    password:''
  })
  const navigate=useNavigate()
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"}/>
          <SubHeading label={"Enter your information to create an account"}/>
          <InputBox onChange={(e)=>{
            setUserData({...userData,fname: e.target.value})
          }} placeholder={"John"} label={"First Name"}/>
          <InputBox onChange={(e)=>{
            setUserData({...userData,lname: e.target.value})
          }} placeholder={"Doe"} label={"Last Name"}/>
          <InputBox onChange={(e)=>{
            setUserData({...userData,username: e.target.value})
          }} placeholder={"Johndeo@gmail.com"} label={"Email"}/>
          <InputBox onChange={(e)=>{
            setUserData({...userData,password: e.target.value})
          }} placeholder={"123456"} label={"password"}/>
          <div className="pt-4">
            <Button onClick={async()=>{
              await signup(userData)
              .then((response)=>{
                navigate('/dashboard')
                localStorage.setItem('token',response.data.token)
              })
            }} label={"Sign up"}/>
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
        </div>
      </div>
    </div>
  )
}

export default Signup
