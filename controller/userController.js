import { getUsersDB, getUserDB, insertUserDB, deleteUserDB, updateUserDB } from '../model/usersDB.js';
import { hash } from 'bcrypt';

let getUsers = async (req, res) => {
    try {
        let users = await getUsersDB();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error retrieving users');
    }
}

let getUser = async (req, res) => {
    try {
        let user = await getUserDB(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user');
    }
}

let insertUser = async (req, res) => {    
    try {
        let { name, surname, age, gender, role, email, password, profile } = req.body;
        let hashedP = await hash(password, 10);
        await insertUserDB(name, surname, age, gender, role, email, hashedP, profile);
        res.send('Data was inserted successfully');
    } catch (error) {
        res.status(500).send('Error inserting user');
    }
}   

let deleteUser = async (req, res) => {
    try {
        let { id } = req.body;
        let result = await deleteUserDB(req.params.id);
        if (result) {
            res.send('User was deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
}

let updateUser = async (req, res) => {
    try {
        let { name, surname, age, gender, role, email, password, profile } = req.body;
        
        let user = await getUserDB(req.params.id);
        if (user) {
            name = name || user.firstName;
            surname = surname || user.lastName;
            age = age || user.userAge;
            gender = gender || user.Gender;
            role = role || user.userRole;
            email = email || user.emailAdd;
            password = password || user.userPass;
            profile = profile || user.userProfile;

            await updateUserDB(req.params.id, name, surname, age, gender, role, email, password, profile);
            res.send('Data has been updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error updating user');
    }
}

const loginUser = (req, res) => {
    try {
        res.send({
            message: "You have signed in successfully", 
            token: req.body.token
        });
    } catch (error) {
        res.status(500).send('Error during login');
    }
};

export { getUsers, getUser, insertUser, deleteUser, updateUser, loginUser };
