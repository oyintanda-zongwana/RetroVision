import { getProductsDB, getProductDB, insertProductDB, deleteProductDB, updateProductDB } from '../model/productsDB.js';

let getProducts = async (req, res) => {
    try {
        res.json(await getProductsDB());
    } catch (error) {
        res.status(500).send('Error retrieving products');
    }
}

let getProduct = async (req, res) => {
    try {
        res.json(await getProductDB(req.params.id));
    } catch (error) {
        res.status(500).send('Error retrieving product');
    }
}

let insertProduct = async (req, res) => {    
    try {
        let { name, quantity, amount, Category, prodUrl } = req.body;
        await insertProductDB(name, quantity, amount, Category, prodUrl);
        res.send('Data was inserted successfully');
    } catch (error) {
        res.status(500).send('Error inserting product');
    }
}   

let deleteProduct = async (req, res) => {
    try {
        let { id } = req.body;
        await deleteProductDB(req.params.id);
        res.send('Product was deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
}

let updateProduct = async (req, res) => {
    try {
        let { name, quantity, amount, Category, prodUrl } = req.body;
        
        let products = await getProductDB(req.params.id);
        name ? name = name : name = products.prodName;
        quantity ? quantity = quantity : quantity = products.quantity;
        amount ? amount = amount : amount = products.amount;
        Category ? Category = Category : Category = products.Category;
        prodUrl ? prodUrl = prodUrl : prodUrl = products.prodUrl;

        await updateProductDB(req.params.id, name, quantity, amount, Category, prodUrl);
        res.send('Data has been updated successfully');
    } catch (error) {
        res.status(500).send('Error updating product');
    }
}

export { getProducts, getProduct, insertProduct, deleteProduct, updateProduct};
