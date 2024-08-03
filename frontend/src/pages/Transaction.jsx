import React, { useEffect , useState } from 'react'
import { getTransactions, getUsername } from '../services/api'
const Transaction = () => {
    const [result,setResult]=useState([]);
    const [fname,setFname]=useState("")
    useEffect(()=>{
        const f=async()=>{
            try{
                const res=await getTransactions()
                setResult(res.data);
                const name=await getUsername();
                setFname(name.data.name+" "+name.data.lname)
            }
            catch(error){
                console.log(error);
            }
        }
        f();
    },[])
  return (
    <div>
        <div className="font-bold text-lg mt-6 mb-6">
            Transaction History
        </div>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Transaction ID</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Date</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">From</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">To</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Amount</th>
                </tr>
            </thead>
            <tbody>
                {result.map((m,idx)=>(
                    <tr key={idx}>
                    <td className="py-2 px-4 border-b">
                        <span className="inline-flex items-center">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.54-10.47a.75.75 0 00-1.06-1.06L9 10.94l-1.47-1.47a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z" clipRule="evenodd"></path></svg>
                            <span className="ml-2">{m._id}</span>
                        </span>
                    </td>
                    <td className="py-2 px-4 border-b">{m.date}</td>
                    <td className="py-2 px-4 border-b">{m.from}</td>
                    <td className="py-2 px-4 border-b">{m.to}</td>
                    <td className="py-2 px-4 border-b" style={{color:(m.from===fname)?'red':'green'}} >{m.amount}</td>
                    
                </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
}

export default Transaction
