import { useEffect, useState } from "react"
import { getUsername } from "../services/api"

import SideBar from "./SideBar";

export const AppBar = () => {
    const [user,setUser]=useState('')
    useEffect(()=>{
        getUsername()
        .then((res)=>{
            setUser(res.data.name)
        })
    },[])
  return (
    <div className="shadow h-14 flex justify-between">
        <div>
            <div className="flex content-start items-center justify-center h-full ml-4">
                <div className="mr-3">
                    <SideBar />
                </div>
                <div>
                    PayTM App
                </div>
            </div>
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center text-lg h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">{user.charAt(0).toUpperCase()}</div>
            </div>
        </div>
    </div>
  )
}
