import { getProductsDB, getProductDB, insertProductDB, deleteProductDB, updateProductDB } from '../model/productsDB.js';

let getProducts = async (req, res) => {
    try {
        let products = await getProductsDB();
        res.json(products); // Returns the object with all products
    } catch (error) {
        res.status(500).send('Error retrieving products');
    }
}

let getProduct = async (req, res) => {
    try {
        let product = await getProductDB(req.params.id);
        if (product) {
            res.json(product); // Returns the single product object
        } else {
            res.status(404).send('Product not found');
        }
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
        let result = await deleteProductDB(req.params.id);
        if (result.affectedRows > 0) {
            res.send('Product was deleted successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
}

let updateProduct = async (req, res) => {
    try {
        let { name, quantity, amount, Category, prodUrl } = req.body;
        
        let product = await getProductDB(req.params.id);
        if (product) {
            name = name || product.prodName;
            quantity = quantity || product.quantity;
            amount = amount || product.amount;
            Category = Category || product.Category;
            prodUrl = prodUrl || product.prodUrl;

            await updateProductDB(req.params.id, name, quantity, amount, Category, prodUrl);
            res.send('Data has been updated successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Error updating product');
    }
}

export { getProducts, getProduct, insertProduct, deleteProduct, updateProduct };
