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
        res.render('../views/leyes/searchForm.ejs', { data: filteredData })
    }
}


module.exports = leyesController;