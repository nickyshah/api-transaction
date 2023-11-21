import TransSchema from './TransSchema.js'


// create transaction 
export const insertTrans = transObj => {
    return TransSchema(transObj).save()
}

// Read transaction by user _id 
export const getUserTrans = (userId) => {
    return TransSchema.find({ userId })
}
// Delete Transaction

// Upate transaction -homework

export const deleteTrans = (userId, idsArg) => {
    return TransSchema.deleteMany({
        userId,
        _id:  {
            $in: idsArg,
        }
    })
}