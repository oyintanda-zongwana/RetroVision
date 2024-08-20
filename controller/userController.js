import {getUsersDB, getUserDB, insertUserDB, deleteUserDB, updateUserDB} from '../model/usersDB.js'
import {hash} from 'bcrypt'

let getUsers = async(req, res) => {
    res.json(await getUsersDB());
}

let getUser = async(req, res) => {
    res.json(await getUserDB(req.params.id));
}

let insertUser = async (req, res) => {    
    let {name, surname, age, gender, role, email, password, profile} = req.body
    let hashedP = await hash(password, 10)
    // await insertUserDB(name, surname, age, gender, role, email, hashedP, profile)
    res.send('data was inserted into successfully')
}   

let deleteUser = async(req, res) => {
    let {id} = req.body
    await deleteUserDB(req.params.id)
    res.send('user was deleted into successfully')
}

let updateUser = async(req, res) => {
    let {name, surname, age, gender, role, email, password, profile} = req.body
    
    let users = await getUserDB(req.params.id)
    name ? name = name: name =  users.firstName 
    surname ? surname = surname: surname =  users.lastName 
    age ? age = age: age =  users.userAge 
    gender ? gender = gender: gender =  users.Gender 
    role ? role = role: role =  role.userRole 
    email ? email = email: email =  users.emailAdd 
    password ? password = password: password =  users.userPass 
    profile ? profile = profile: profile =  users.userProfile 

    await updateUserDB(req.params.id, name, surname, age, gender, role, email, password, profile)
    res.send('data has been updated successfully')
}

let loginUser = (req, res) => {
    res.send({
        message:"you have signed in successfully", 
        token:req.body.token})
}

export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser}