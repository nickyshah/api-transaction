import mongoose from 'mongoose'

export const connectMongoDb = async () => {
    try {
        if(!process.env.MONGO_URl){
            return console.log("No mondobb connection url is found, Please add MONGO_URl in your env file")
        }
        const con = await mongoose.connect(process.env.MONGO_URl)
        con && console.log("Mongodb Connected")
    } catch (error) {
        console.log(error)
    }
}