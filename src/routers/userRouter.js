import express from 'express'
import { getUserByEmail, insertUSer } from '../module/user/UserModule.js'
import { comparePassword, hashPassword } from '../utils/bcryptHelper.js'

const router = express.Router()

router.get("/", (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "to be completed get"
        })
    } catch (error) {
        // error.errorCode = 401
        next(error)
    }
})


// creating user 

router.post("/", async (req, res, next) => {
    try {
        // console.log(req.body)
        const { password } = req.body

        // hash password 
        req.body.password = hashPassword(password)

        // insert user 
        const result = await insertUSer(req.body)
        result?._id ?
            res.json({
                status: "success",
                message: "Your account has been created, You May Login Now"
            }) :
            res.json({
                status: "error",
                message: "Unable to create an account now, Please contact admin for support"
            })
    } catch (error) {
        // error.errorCode = 401
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "There is another user who has use this email"
            error.errorCode = 200
        }
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        // console.log(req.body)
        const {password, email} = req.body
        // console.log(req.body)

        // check if user exist for the given email 
        const result = await getUserByEmail(email)
        // console.log(result)

        if (result?.password) {
            // check if the plain pass and the pass from the db, the hashed one is the same 
            const isMatched = comparePassword(password, result.password)

            console.log(isMatched, "checking the password") 
            if (isMatched) {
                result.password = undefined;

                // const {password, ...user} = result
                return res.json({
                    status: "success",
                    message: "Log In Successful",
                    user: result,
                })
            }
            


        }
        res.json({
            status: "error",
            message: "Invalid Login"
        })
    } catch (error) {
        // error.errorCode = 401
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message = "There is another user who has use this email"
            error.errorCode = 200
        }
        next(error)
    }
})

router.put("/", (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "to be completed put"
        })
    } catch (error) {
        // error.errorCode = 401
        next(error)
    }
})

router.patch("/", (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "to be completed patch"
        })
    } catch (error) {
        // error.errorCode = 401
        next(error)
    }
})

router.delete("/", (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "to be completed patch"
        })
    } catch (error) {
        // error.errorCode = 401
        next(error)
    }
})

export default router