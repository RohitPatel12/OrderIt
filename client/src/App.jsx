import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice.js';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    console.log("UserData", userData.data)
    dispatch(setUserDetails(userData))
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
  <>
    <Header/>
    <main className='min-h-[80vh]'>
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
  </>
  )
}

export default App
