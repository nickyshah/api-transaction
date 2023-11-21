import express from 'express'
import cors from 'cors'
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())
app.use(cors())

// db connnection
import {connectMongoDb} from './src/config/dbConfig.js'
connectMongoDb()


// =========== Routers ========
import userRouter from './src/routers/userRouter.js'
import transRouter from './src/routers/TransRouter.js'
app.use("/api/v1/user", userRouter)
app.use("/api/v1/transaction", transRouter)



app.get("/", (req, res)=> {
    res.json({
        message:"Server is live"
    })
})

app.use("*", (req, res, next) =>{
    const obj = {
        message: "404 Page not found",
        errorCode : 404,
    }
})


// error handling at one place 
app.use((error, req, res, next)=>{
    console.log(error);
    // log  ---- 
    const erorCode = error.errorCode || 500
    res.status(erorCode).json({
        status: "error",
        message: error.message,
    })
})

app.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server is running at http://localhost:${PORT}`)
})



console.log("Hahah")