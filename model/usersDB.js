import { pool } from '../config/config.js';
import { config } from 'dotenv';
config();

const getUsersDB = async () => {
    let [rows] = await pool.query('SELECT * FROM users');
    
    // Wrap the array of users in an object with a "results" key
    let data = {
        results: rows
    };
    
    return data;
};

const getUserDB = async (email) => {
    let [[data]] = await pool.query('SELECT * FROM users WHERE emailAdd = ?', [email]);
    return data;
};

const getUserIdDB = async (id) => {
    let [[data]] = await pool.query('SELECT * FROM users WHERE userID = ?', [id]);
    return data;
};

const insertUserDB = async (name, surname, age, gender, role, email, password, profile) => {
    let [data] = await pool.query(`
        INSERT INTO users (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, surname, age, gender, role, email, password, profile]);
    return data;
};

const deleteUserDB = async (id) => {
    await pool.query("DELETE FROM users WHERE userID = ?", [id]);
};

const updateUserDB = async (id, name, surname, age, gender, role, email, password, profile) => {
    await pool.query(`
        UPDATE users 
        SET firstName = ?, lastName = ?, userAge = ?, Gender = ?, userRole = ?, emailAdd = ?, userPass = ?, userProfile = ? 
        WHERE userID = ?
    `, [name, surname, age, gender, role, email, password, profile, id]);
};

export { getUsersDB, getUserDB, insertUserDB, deleteUserDB, updateUserDB, getUserIdDB };
