const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcryptjs')
exports.signup = async (req,res)=>{
    const {username,password,firstName , lastName} = req.body;
    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' , success:false});
        
    }

    try{

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT into users (username ,password , firstName,lastName) values (? ,? ,? ,?)`;

        db.query(sql,[username,hashedPassword,firstName,lastName],(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({success:false,messgae:"Error Occured" , err});
            }
            res.status(201).json({ message: 'User created successfully' });
        })

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
        db.query(sql,[username],async(err,results)=>{
            if(err){
                console.log(err);
                res.json({
                    success:false,
                    message:"Error While Loging user"
                })
            }
             console.log("Results" , results);
             
            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            const user = results[0];
    
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            res.status(200).json({ message: 'Login successful' });
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:error.message
        })
    }
}

exports.updateUser = (req, res) => {
    const { username, firstName, lastName } = req.body;
    if (!username) {
        return res.status(400).json({ success: false, message: 'Username is required to update' });
    }

    try {
        const sql = `UPDATE users SET firstName = ?, lastName = ? WHERE username = ?`;
        db.query(sql, [firstName, lastName, username], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Error updating user' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            res.status(200).json({ success: true, message: 'User updated successfully' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// Get All Users Controller (without passwords)
// ========================
exports.getAllUsers = (req, res) => {
    try {
        const sql = `SELECT username, firstName, lastName FROM users`;
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Error fetching users' });
            }

            res.status(200).json({ success: true, users: results });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};