import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'

let port = process.env.PORT || 5555
const app = express()

app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}))
app.use(express.json())

app.use(express.static('public'))
app.use('/user', userRouter)
app.use('/product', productRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log(`Server is running on port ${port}`)
})