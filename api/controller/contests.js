const db = require('../models/database').Pool

function contest(req,res) {
	let sql = `select start, end from config limit 1`
	db.query(sql,(err,result) => {
		res.json({serverTime:Math.floor(Date.now()/1000),...result[0]})
	})
}

module.exports = {
	contest,
}