const express = require('express');
const router = express.Router();
const leyesController = require('../controllers/leyesController');
const path = require('path');

// Configuracion Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/files'));
    },
    filename: (req, file, cb) => {
        const fileNameNoExtension = path.basename(file.originalname, path.extname(file.originalname));
        const newFileName = fileNameNoExtension + Date.now() + ' - ' + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({ storage });

//Listar Anexos
router.get('/list', leyesController.list);

//Cargar un Anexo
router.get('/create', leyesController.create);
router.post('/create', upload.single('norm'), leyesController.store);

// Detalle de un Anexo // 
router.get('/detail/:id/', leyesController.detail);

module.exports = router