import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home.jsx'
import SearchPage from '../pages/SearchPage.jsx'
import Login from '../pages/login.jsx'
import Register from '../pages/Register.jsx'
import OtpVerification from '../pages/OtpVerification.jsx'
import ForgotPassword from '../pages/forgotPassword.jsx'
import UserMenuMobile from '../pages/UserMenuMobile.jsx'
import ResetPassword from '../pages/ResetPassword.jsx'

const router = createBrowserRouter([

    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : 'register',
                element : <Register/>
            },
            {
                path : 'forgot-password',
                element : <ForgotPassword/>
            },
            {
                path : 'verification-otp',
                element : <OtpVerification/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path : "user",
                element : <UserMenuMobile/>
            }
        ]
    }

])

export default router 