import jwt from "jsonwebtoken"

const auth = async(request, response, next)=>{
    try {
        const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1] //Bearer token
        console.log("token",token)
        if(!token){
            return response.status(401).json({
                message:"Provide token"
            })
        }
  
        const decode  = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)
        // console.log("Decode", decode)
        
        if (!decode){
            return response.status(401).json({
                messsage:"Unauthoried access",
                error: true,
                success : false
            })
        }

        request.userId = decode.id

        // console.log("I am decode.id", decode.id)
        // console.log("so far so good in auth.js -----1")

        // console.log("I am request.userId",request.userId)
        // console.log("so far so good in auth.js -----2")
        next()

    } catch (error) {
        return response.status(500).json({
            message : "You have not logged in", // error.message || error,
            error : true,
            success : false
        })
    }
}

export default auth