import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
const SideBar = () => {
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
      }
      
      /* Set the width of the side navigation to 0 */
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }
  return (
    <div>
        <div id="mySidenav" className="sidenav">
            <Link to="javascript:void(0)" className="closebtn text-gray-800 hover:bg-gray-900" onClick={closeNav}>&times;</Link>
            <Link to="/dashboard" className='text-gray-800 hover:bg-gray-900'>Home</Link>
            <Link to="/Signin" className='text-gray-800 hover:bg-gray-900'>Signin</Link>
            <Link to="/Signup" className='text-gray-800 hover:bg-gray-900'>Signup</Link>
            <Link to="/transaction" className='text-gray-800 hover:bg-gray-900'>Transactions</Link>
        </div>


        <span onClick={openNav}><img src="./ham.png" alt="" style={{width:'25px' ,height:'25px'}}/></span>
    </div>
  )
}

export default SideBar
