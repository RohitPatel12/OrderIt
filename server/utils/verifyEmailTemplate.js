const verifyEmailTemplate = ({name, url}) => {
    return `
    <p> Dear ${name}</p>
    <p> Thankyou for regitering OrderIt. </p>
    <a href=${url}; style="color:white;background:blue;margin-top:10px"> Verify email </a> `
}

export default verifyEmailTemplate