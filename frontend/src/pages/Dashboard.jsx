import { useEffect, useState } from 'react'
import {AppBar} from '../components/AppBar'
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
import { getBalance } from '../services/api'
const Dashboard = () => {
  const [balance,setBalance]=useState(0)
  useEffect(()=>{
    const g=async()=>{
      await getBalance()
      .then((response)=>{
        setBalance(response.data.balance)
      })
    }
    g()
  })
  return (
    <div>
      <AppBar/>
      <div className="m-8">
        <Balance value={balance}/>
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
