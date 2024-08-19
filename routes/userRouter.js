import express from 'express'
import {getUsers, getUser, insertUser, deleteUser, updateUser} from '../controller/userController.js'
// import { checkUser } from '../middleware/authenticate.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)

userRouter.post('/insert', insertUser)

userRouter
        .route('/:id')
            .get(getUser)
            .delete(deleteUser)
            .patch(updateUser)


export default userRouter