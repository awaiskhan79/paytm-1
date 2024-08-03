import {Heading} from '../components/Heading'
import {Button} from '../components/Button'
import { SubHeading } from "../components/SubHeading"
import {InputBox} from '../components/InputBox'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import { signin } from '../services/api'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const [user,setUser]=useState({
    username:'',
    password:''
  })
  const navigate=useNavigate()
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox onChange={(e)=>{
            setUser({...user,username: e.target.value})
          }} placeholder="JohnDoe@gmail.com" label={"Email"} />
          <InputBox onChange={(e)=>{
            setUser({...user,password: e.target.value})
          }} placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button onClick={async()=>{
              await signin(user)
              .then((response)=>{
                navigate('/dashboard')
                localStorage.setItem('token',response.data.token)
              })
              
            }} label={"Sign in"} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}

export default Signin
