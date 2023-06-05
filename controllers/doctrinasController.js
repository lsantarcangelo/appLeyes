const fs = require('fs');
const path = require('path');
const doctrinasPath = path.join(__dirname, '../data/doctrinasData.json');
const doctrinas = JSON.parse(fs.readFileSync(doctrinasPath, 'utf-8'));

const doctrinasController = {
    create: function(req, res) {
        res.render('../views/doctrinas/createFormDoctrinas.ejs')
    },
    store: function(req, res) {
        let newDoctrina = {
            "id": doctrinas == '' ? 1 : doctrinas[leyes.length - 1].id + 1,
            "type": req.body.type,
            "number": req.body.number,
            "year": req.body.year,
            "subject": req.body.subject,
            "status": req.body.status,
            "norm": req.file.filename
        };
        doctrinas.push(newDoctrina);
        fs.writeFileSync(doctrinasPath, JSON.stringify(doctrinas, null, ' '));
        res.redirect('/')
    },
    list: function(req, res) {
        res.render('../views/doctrinas/doctrinasList.ejs', {doctrinas})
    },
    search: function(req, res) {
        res.render('../views/doctrinas/searchFormDoctrinas.ejs', { data: [] });
    },
    searchResult: function(req, res) {
        let filteredData = doctrinas.filter(element => 
            element.type == req.body.type || 
            element.year == req.body.year ||
            element.subject == req.body.subject ||
            element.number == req.body.number ||
            element.status == req.body.status);
        console.log(filteredData);
        res.render('../views/doctrinas/searchFormDoctrinas.ejs', { data: filteredData })
    },
    detail: function(req, res) {
        const doctrina = doctrinas.find(element => element.id == req.params.id)
        const file = path.join(__dirname, '../public/files/doctrinas/'+`${doctrina.norm}`)
        res.sendFile(file);
    }
}


module.exports = doctrinasController;