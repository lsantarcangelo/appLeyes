const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/usersData.json');
const usersJson = fs.readFileSync(usersPath, 'utf-8');
const users = (usersJson != "") ? JSON.parse(usersJson) : [];
let loggedUser;

const usersController = {
    login: function(req, res) {
        res.render('../views/loginForm.ejs')
    },

    processLogin: function(req, res) {
        for (let i = 0; users.length-1; i++) {
            if (users[i].email == req.body.email) {
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
        res.send('Logueo exitoso')
    },

    register: function(req, res) {
        res.render('../views/registerForm.ejs');
    },

    processRegister: function(req, res){
        let newUser = {
            'id': users.length != 0 ? users[users.length - 1].id + 1 : 1,
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'password': req.body.password
        }
        users.push(newUser);
        fs.writeFileSync(usersPath, JSON.stringify(users, null, ' '));
        res.redirect('/users/')
    }
}

module.exports = usersController
