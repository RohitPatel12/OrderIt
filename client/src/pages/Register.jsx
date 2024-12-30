import  { useState } from 'react'
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { Link, useNavigate } from 'react-router-dom';



const Register = () => {
  const [data, setData] =  useState({
    name : "",
    email : "",
    Password : "",
    confirmPassword : ""
  })

  const [showPassword, setshowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((previous)=>{
        return {
          ...previous,
          [name] : value
        }
    })
     
  }

  const handleSubmit = async(e) => {
      e.preventDefault()

      if (data.Password !== data.confirmPassword){
          toast.error(
            "Password and Confirm password must be same"
          )
          return 
      }

      try {
        const response = await Axios({
          method: SummaryApi.register.method,
          url: SummaryApi.register.url,
          data: {
            name: data.name,
            email: data.email,
            password: data.Password,
          },
        });
        
        if (response.data.error){
          toast.error(response.data.message)
        }

        if (response.data.success){
          toast.success(response.data.message)
          setData({
            name : "",
            email : "",
            Password : "",
            confirmPassword : ""
          })
          navigate('/login')
        }

      } catch (error) {
        AxiosToastError(error)
      }
      
  }

  const validateValue = Object.values(data).every(el => el)

  return (
    <section className=' w-full container px-2 mx-auto'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
      <p>Welcome to OrderIt</p>
      <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
        <div className='grid gap-1'>
          <label htmlFor="name">Name :</label>
          <input type="text" 
          id='name'
          autoFocus 
          name='name' 
          className='bg-blue-50 p-2 border rounded outline-none focus:border-primary'
          value={data.name}
          onChange={handleChange} 
          placeholder='Enter you name'
          />
        </div>
        <div className='grid gap-1'>
          <label htmlFor="email">Email :</label>
          <input type="email" 
          id='email' 
          name='email' 
          className='bg-blue-50 p-2 border rounded outline-none focus:border-primary'
          value={data.email}
          onChange={handleChange} 
          placeholder='Enter your email'
          />
        </div>
        <div className='grid gap-1'>
          <label htmlFor="password">Password :</label>
          <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary'>
          <input type={showPassword ? 'text' : 'password'} 
          id='Password' 
          name='Password' 
          className='w-full outline-none'
          value={data.Password}
          onChange={handleChange} 
          placeholder='Enter your password'
          />
          <div onClick={()=> setshowPassword(previous => !previous)} className='cursor'>
            {
              showPassword ? (
                <FaEye />
              ) : (
                <IoEyeOff />
              )
            }
          </div>
          </div>
        </div> 
        <div className='grid gap-1'>
          <label htmlFor="confirmPassword">Confirm Password :</label>
          <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary'>
          <input type={showConfirmPassword ? 'text' : 'password'} 
          id='confirmPassword' 
          name='confirmPassword' 
          className='w-full outline-none'
          value={data.confirmPassword}
          onChange={handleChange} 
          placeholder='Enter your confirm password'
          />
          <div onClick={()=> setshowConfirmPassword(previous => !previous)} className='cursor'>
            {
              showConfirmPassword ? (
                <FaEye />
              ) : (
                <IoEyeOff />
              )
            }
          </div>
          </div>
        </div> 
        <button disabled={!validateValue} className={` ${ validateValue ? "bg-green-800 hover:bg-green-700" : " bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Register</button> 
      </form>

            <p>
              Already have an account?
              <Link to={'/login'} className='font-semibold text-green-700 hover:text-green-800'> Login </Link>
            </p>

      </div>
    </section>
  )
}

export default Register
