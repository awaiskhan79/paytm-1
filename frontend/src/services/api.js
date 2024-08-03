import axios from 'axios'
const url="http://localhost:3000"
export const signup=async (data)=>{
    return await axios.post(`${url}/api/v1/user/signup`,data)
}
export const signin=async(data)=>{
    return await axios.post(`${url}/api/v1/user/signin`,data)
}
export const getUsers=async(filter)=>{
    return await axios.get(`${url}/api/v1/user/bulk?filter=${filter}`,{
        headers: {Authorization:`Bearer ${localStorage.token}`}
    })
}
export const sendMoney=async(id,amount)=>{
    return await axios.post(`${url}/api/v1/account/transfer`,{
        to:id,
        amount
    },{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
    })
}
export const getBalance=async()=>{
    return await axios.get(`${url}/api/v1/account/balance`,{
        headers:{
            Authorization: "Bearer "+ localStorage.getItem('token')
        }
    })
}
export const getUsername=async()=>{
    return await axios.get(`${url}/api/v1/user/username`,{
        headers:{
            Authorization:'Bearer '+localStorage.getItem('token')
        }
    })
}
export const updateUser=async(data)=>{
    return await axios.put(`${url}/api/v1/user`,data,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}
export const getTransactions=async()=>{
    return await axios.get(`${url}/api/v1/user/transaction`,{
        headers: {Authorization:`Bearer ${localStorage.token}`}
    })
}
// export const received=async()=>{
//     return await axios.get(`${url}/api/v1/user/received`,{
//         headers: {Authorization:`Bearer ${localStorage.token}`}
//     })
// }