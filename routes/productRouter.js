import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct} from '../controller/productController.js'
// import { verifyAToken } from '../middleware/authenticate.js'

const productRouter = express.Router()

productRouter.get('/', getProducts)

productRouter.post('/insert', insertProduct)

productRouter
        .route('/:id')
            .get(getProduct)
            .delete(deleteProduct)
            .patch(updateProduct)


export default productRouter