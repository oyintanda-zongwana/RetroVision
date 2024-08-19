import {pool} from '../config/config.js'
import {config} from 'dotenv'
config()

const getProductsDB = async () => {
    let [data] = await pool.query('SELECT * FROM products');
    return data 
}

const getProductDB = async (id) => {
    let [[data]] = await pool.query('SELECT * FROM products WHERE prodID = ?', [id])
    return data
}

const insertProductDB = async (name, quantity, amount, Category, prodUrl) => {
    let [data] = await pool.query(`
        INSERT INTO products (prodName, quantity, amount, Category, prodUrl)
        VALUES (?, ?, ?, ?, ?)
        `, [name, quantity, amount, Category, prodUrl])
        return data
}

const deleteProductDB = async (id) => {
    await pool.query("DELETE FROM products WHERE prodID = ?", [id])
}

const updateProductDB = async (id, name, surname, age, code, car, eye) => {
    await pool.query("UPDATE products SET name = ?, surname = ?, age = ?,  fav_coding_lang = ?, fav_car = ?, eye_color = ? WHERE prodID = ?", [name, surname, age, code, car, eye, id])
}

export {getProductsDB, getProductDB, insertProductDB, deleteProductDB, updateProductDB}