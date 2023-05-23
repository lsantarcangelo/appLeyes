var express = require('express');
var router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

const validations = [
    check('firstName').notEmpty().withMessage('Debe ingresar su nombre'),
    check('lastName').notEmpty().withMessage('Debe ingresar su apellido'),
    check('email')
        .notEmpty().withMessage('Debe ingresar su correo electrónico').bail()
        .isEmail().withMessage('Debe ingresar un formato válido de correo'),
    check('password').notEmpty().withMessage('Debe ingresar una contraseña'),
    check('avatar').custom( (value, {req}) => {
        let file = req.file;
        if (!file) {
            throw new Error('Debe subir una imagen');
        }
        return true;
    })
];

// Configuracion Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        const fileNameNoExtension = path.basename(file.originalname, path.extname(file.originalname));
        const newFileName = fileNameNoExtension + Date.now() + ' - ' + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({ storage });

/* Users Routes */

//Login
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

//Register
router.get('/register', usersController.register);
router.post('/register', upload.single('avatar'), validations, usersController.processRegister);

//Profile
router.get('/profile/:id/', usersController.profile);

module.exports = router;
