const forgotPasswordTemplate = ({name, otp}) => {
    return `
    <div>
    <p>Dear, ${name}
    </p>
    <p> You have requested forgot password option </p>
    <div style="background:yellow">
    ${otp}
    </div>
    <p> This OTP is only valid for one hour, please enter this OTP on orderit website to reset your password.
    </p>
    <br/>
    </br>
    <p>Thank you</p>
    <p>Order it</p>
    </div>
    `
}

export default forgotPasswordTemplate