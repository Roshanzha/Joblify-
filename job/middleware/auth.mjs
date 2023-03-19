import jwt from "jsonwebtoken"
import {UnAuthenticatedError} from '../errors/index.mjs'
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer')) {
       throw new UnAuthenticatedError('authentication invalid')
    }
    try {
           //     //this changes to array
           const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)       
        // req.user = payload
        req.user = {userId:payload.userId}   
        next()
    }
    catch (error) {
        // throw new UnAuthenticatedError('authentication invalid')
res.status(401).send('not  found')
      
    
    }
}
export default auth