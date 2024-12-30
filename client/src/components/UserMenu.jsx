import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UserMenu = ({}) => {
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const handleLogout =async()=>{
    try {
      // console.log(localStorage.getItem("token"));
      // const token = localStorage.getItem("accessToken");
      // console.log("Token in LocalStorage:", token);
      const response = await Axios({
        ...SummaryApi.logout
      })
      if (response.data.success){
        if(close){
          close()
        }
        close()
        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm'>{user.name || user.mobile}</div>
      <Divider/>
      <div className='text-sm grid gap-2'>
        <Link className='hover:bg-orange-100 py-1' to={""}>My Orders</Link>
        <Link className='hover:bg-orange-100 py-1' to={""}>Saved Addresses</Link>
        <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-100 py-1'>Logout</button>
      </div>
    </div>
  )
}

export default UserMenu
