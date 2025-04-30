const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcryptjs')
exports.signup = async (req,res)=>{
    const {username,password,firstName , lastName} = req.body;
    console.log(username,password,firstName,lastName)
    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' , success:false});
        
    }

    try{

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT into users (username ,password , firstName,lastName) values (? ,? ,? ,?)`;

        await db.execute(sql,[username,hashedPassword,firstName,lastName],{prepare:true});

        return res.status(200).json({
            success:true,
            messgae:"Signup Done"
        });


    }
    catch(e){
        console.log("Error " , e);
        return res.status(500).json({
            success:false,
            error:e
        })
    }
}

exports.login = async (req,res)=>{
    const {username , password} =req.body;
    if(!username || !password){
        return res.json({
            success:false,
            message:"UserName Or Pass Missing "
        })
    }

    try {
        const sql =    `Select * from users where username = ?`;
       const results =  await db.execute(sql,[username]);
       if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    console.log("Results :: ",results)

    const user = results.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
}
    catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:error.message
        })
    }
}

exports.updateUser = async(req, res) => {
    const { username, firstName, lastName } = req.body;
    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required to update' });
    }

    try {
        const sql = `UPDATE users SET firstName = ?, lastName = ? WHERE username = ?`;
        const result = await  db.execute(sql, [firstName, lastName, username]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// Get All Users Controller (without passwords)
// ========================
exports.getAllUsers = async (req, res) => {
    try {
        const sql = `SELECT username, firstName, lastName FROM users`;
        const results = await db.execute(sql);
        res.status(200).json({ success: true, users: results.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};