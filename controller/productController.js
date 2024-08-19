import {getProductsDB, getProductDB, insertProductDB, deleteProductDB, updateProductDB} from '../model/productsDB.js'
// import {hash} from 'bcrypt'

let getProducts = async(req, res) => {
    res.json(await getProductsDB());
}

let getProduct = async(req, res) => {
    res.json(await getProductDB(req.params.id));
}

let insertProduct = async (req, res) => {    
    let {name, quantity, amount, Category, prodUrl} = req.body
    await insertUserDB(name, quantity, amount, Category, prodUrl)
    res.send('data was inserted into successfully')
}   

let deleteProduct = async(req, res) => {
    let {id} = req.body
    await deleteProductDB(req.params.id)
    res.send('Product was deleted into successfully')
}

let updateProduct = async(req, res) => {
    let {name, quantity, amount, Category, prodUrl} = req.body
    
    let products = await getProductDB(req.params.id)
    name ? name = name: name =  products.prodName 
    quantity ? quantity = quantity: quantity =  products.quantity 
    amount ? amount = amount: amount =  products.amount 
    Category ? Category = Category: Category =  products.Category 
    prodUrl ? prodUrl = prodUrl: prodUrl =  products.prodUrl 

    await updateProductDB(req.params.id, name, quantity, amount, Category, prodUrl)
    res.send('data has been updated successfully')
}

export {getProducts, getProduct, insertProduct, deleteProduct, updateProduct}