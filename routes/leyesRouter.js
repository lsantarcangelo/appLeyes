const express = require('express');
const router = express.Router();
const leyesController = require('../controllers/leyesController');
const path = require('path');

// Configuracion Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/files/leyes'));
    },
    filename: (req, files, cb) => {
        //const fileNameNoExtension = path.basename(files.originalname, path.extname(files.originalname));
        //const newFileName = fileNameNoExtension + Date.now() + ' - ' + path.extname(files.originalname);
        cb(null, files.originalname);
    }
});
const upload = multer({ storage });

//Listar Normas //
router.get('/list', leyesController.list);

//Cargar una Norma //
router.get('/create', leyesController.create);
router.post('/create', upload.array('norms', 10), leyesController.store);

// Detalle de una Norma // 


// Buscar Normas //
router.get('/search', leyesController.search);
router.get('/search/result', leyesController.searchResult);


module.exports = router