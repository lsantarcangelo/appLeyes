const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/usersData.json');
const usersJson = fs.readFileSync(usersPath, 'utf-8');
const users = (usersJson != "") ? JSON.parse(usersJson) : [];
const bcryptjs = require('bcryptjs');
let loggedUser;
let checkUser = function (field, text) {
    let check = users.find(user => user[field] == text);
    return check;
};
const { validationResult } = require('express-validator');


const usersController = {
    login: function(req, res) {
        res.render('../views/loginForm.ejs')
    },

    processLogin: function(req, res) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.body.email && bcryptjs.compareSync(req.body.password, users[i].password)) {
                loggedUser = users[i];
                break;
            }
        }
        if (loggedUser == undefined) {
            return res.render('../views/loginForm.ejs', {errors: [
                {msg: 'Credenciales Inválidas'}
            ]})
        }
        req.session.loggedUser = loggedUser;
        userId = loggedUser.id;
        res.redirect('/users/profile/:userId')
    },

    register: function(req, res) {
        res.render('../views/registerForm.ejs');
    },

    processRegister: function(req, res){
        const validateRegister = validationResult(req);
        if(validateRegister.errors.length > 0) {
            return res.render('../views/registerForm.ejs', { 
                errors: validateRegister.mapped(),
                dataOnHold: req.body   
            })
        }
        if(checkUser('email', req.body.email)){
            return res.send('Ya hay otro usuario registrado con dicho mail');
        }
        let newUser = {
            'id': users.length != 0 ? users[users.length - 1].id + 1 : 1,
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'password': bcryptjs.hashSync(req.body.password, 10),
            'avatar': req.file.filename
        }
        users.push(newUser);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, ' '));
        res.redirect('/users/login')
    },

    profile: function(req, res) {
        let user = req.session.loggedUser;
        res.render('../views/userProfile.ejs', {user: user})
    }
}

module.exports = usersController
