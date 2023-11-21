import { getUserById } from "../module/user/UserModule.js"

export const userAuth = async (req, res, next) => {
  

// check if the user exist with the _id or not 
try {
    const {authorization} = req.headers

const user = await getUserById(authorization)

if(user?._id){
    req.userId = authorization
    next()
    return
}
//    check the auth....
res.status(403).json({
    status: "error",
    message: "Unauthrized "
})
} catch (error) {
    next(error)
}

}