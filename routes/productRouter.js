import express from 'express'
import {getProducts, getProduct, insertProduct, deleteProduct, updateProduct} from '../controller/productController.js'

const productRouter = express.Router()

productRouter.get('/', getProducts)

productRouter.post('/insert', insertProduct)

productRouter
        .route('/:id')
            .get(getProduct)
            .delete(deleteProduct)
            .patch(updateProduct)


export default productRouter