import UserSchema from './UserSchema.js'


// insert new user 
export const insertUSer = userObj => {
    return UserSchema(userObj).save()
}

// get  user by their ID -string
export const getUserById = _id => {
    return UserSchema.findById(_id)
}

// get  user by their email
export const getUserByEmail = email => {
    return UserSchema.findOne({email})
}

// Update user 




// Delete user 