import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser} from '../controller/userController.js'


const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.get('/', getUsers)

userRouter.post('/insert', insertUser)

userRouter
        .route('/:id')
            .get(getUser)
            .delete(deleteUser)
            .patch(updateUser)


export default userRouter