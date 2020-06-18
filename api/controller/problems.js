const db = require('../models/database').Pool
function getProblem(req,res) {
    var sql = `select * from problem`
    db.query(sql,(err,problem) => {
        if(err) return res.status(500).send('')
        return res.status(200).json({problem})
    })
}

function getDoc(req,res) {
}

module.exports = {
    getProblem
}