import express from 'express'
import { getUserTrans, insertTrans } from '../module/transaction/TransModule.js'
import { userAuth } from '../middleware/authMiddleware.js'
import { deleteTrans } from '../module/transaction/TransModule.js'

 const router = express.Router()

// ?insert transaction
router.post("/", userAuth, async (req, res) => {
    try {
        console.log(req.body)
        const result = await insertTrans({...req.body, userId: req.userId})

        result?._id ? 
        res.json({
            status: 'success',
            message: "Transaction Has Been Successfully Created!",
        }) : 
        res.json({
            status: 'error',
            message: "Unable to add the transaction, Please Try Again later",
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 'error',
            message: 'Error, Transaction cannot be added'
        })
    }
})

router.get("/", userAuth, async (req, res, next) => {
    try {
        const transList = await getUserTrans(req.userId)
        res.json({
            status: "success",
            message:"",
            transList
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/', userAuth, async (req, res, next)=> {
    // delete all transactions of a particular user
    try {
        const {userId, body} = req 
        // console.log(req.body)
        const result = await deleteTrans(userId, body)

        result.deletedCount ? res.json({
            status:'success',
            message:`${result.deletedCount} Transactions has been deleted`
        }) :  res.json({
            status:'error',
            message:`Unable to Delete the transaction!! Please try again later`
        })
    } catch (error) {
        
    }
    // const data = req.body
    // const result = await deleteTrans(data)
    // result.deletecount ? 
    // res.json({
    //     status:"success",
    //     message:"Deleted Successfully"
    // }) : 
    // res.json({
    //     status:"error",
    //     message:"Item Can't be deleted..."
    // })
})



export default router