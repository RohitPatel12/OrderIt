import jwt from 'jsonwebtoken'

const generatedAccessToken = async(userID)=>{
    const token = await jwt.sign({id : userID},
         process.env.SECRET_KEY_ACCESS_TOKEN,
          {expiresIn : '5h'}

    )

    return token
}

export default generatedAccessToken