const fs = require('fs');
const path = require('path');
const leyesPath = path.join(__dirname, '../data/leyesData.json');
const leyes = JSON.parse(fs.readFileSync(leyesPath, 'utf-8'));

const leyesController = {
    create: function(req, res) {
        res.render('../views/leyes/createForm.ejs')
    },
    store: function(req, res) {
        let newLey = {
            "id": leyes == '' ? 1 : leyes[leyes.length - 1].id + 1,
            "type": req.body.type,
            "number": req.body.number,
            "year": req.body.year,
            "status": req.body.status,
            "norm": req.file.filename
        };
        leyes.push(newLey);
        fs.writeFileSync(leyesPath, JSON.stringify(leyes, null, ' '));
        res.redirect('/')
    },
    list: function(req, res) {
        res.render('../views/leyes/leyesList.ejs', {leyes})
    },
    search: function(req, res) {
        res.render('../views/leyes/searchForm.ejs', { data: [] });
    },
    searchResult: function(req, res) {
        let filteredData = leyes.filter(element => 
            element.type == req.body.type || 
            element.year == req.body.year ||
            element.number == req.body.number ||
            element.status == req.body.status);
        console.log(filteredData);
        res.render('../views/leyes/searchForm.ejs', { data: filteredData })
    },
    detail: function(req, res) {
        const ley = leyes.find(element => element.id == req.params.id)
        const file = path.join(__dirname, '../public/files/'+`${ley.norm}`)
        res.sendFile(file);
    }
}


module.exports = leyesController;