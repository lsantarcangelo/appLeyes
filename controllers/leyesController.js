const fs = require('fs');
const path = require('path');
const leyesPath = path.join(__dirname, '../data/leyesData.json');
const leyes = JSON.parse(fs.readFileSync(leyesPath, 'utf-8'));

const leyesController = {
    create: function(req, res) {
        res.render('../views/leyes/createForm.ejs')
    },
    store: function(req, res) {
        let filenames = req.files.map(file => file.filename);
        let newLey = {
            "id": leyes == '' ? 1 : leyes[leyes.length - 1].id + 1,
            "type": req.body.type,
            "number": req.body.number,
            "year": req.body.year,
            "status": req.body.status,
            "norm": filenames
        };
        leyes.push(newLey);
        fs.writeFileSync(leyesPath, JSON.stringify(leyes, null, ' '));
        res.redirect('/')
    },
    edit: function(req, res) {
        let ley = leyes.find(element => element.id == req.params.id);
        res.render('../views/leyes/leyesEditForm.ejs', {ley});
    },
    update: function(req, res) {
        let leyMod = {
            'id': req.params.id,
            'type': req.body.type,
            'number': req.body.number,
            'year': req.body.year,
            'status': req.body.status,
            'norm': req.file.filename 
        };
        let leyUpdated = leyes.map( element => {
            if (element.id == leyMod.id) {
                return element = leyMod
            } else {
                return element
            }
        });
        fs.writeFileSync(leyesPath, JSON.stringify(leyUpdated, null, ''));
		res.redirect(`/detail/:${req.params.id}/`);
    },
    list: function(req, res) {
        console.log(leyes)
        res.render('../views/leyes/leyesList.ejs', {leyes})
    },
    search: function(req, res) {
        res.render('../views/leyes/searchForm.ejs', { data: [] });
    },
    searchResult: function(req, res) {
        const { type, number, year, status, norm } = req.query;
        const filteredData = leyes.filter(element => {
            return (
                (!type || element.type.toLowerCase().includes(type.toLowerCase())) &&
                (!number || element.number.toLowerCase().includes(number.toLowerCase())) &&
                (!year || element.year.toLowerCase().includes(year.toLowerCase())) &&
                (!status || element.status.toLowerCase().includes(status.toLowerCase())) &&
                (!norm || element.norm.toLowerCase().includes(norm.toLowerCase()))
              )});
        res.render('../views/leyes/searchForm2.ejs', { data: filteredData })
    },
    detail: function(req, res) {
        let ley = leyes.find(element => element.id == req.params.id)
        res.render('../views/leyes/leyesDetail.ejs', { ley })
    }
}


module.exports = leyesController;