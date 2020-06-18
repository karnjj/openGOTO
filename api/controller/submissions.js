const db = require('../models/database').Pool
const jwt = require('jsonwebtoken')

var verifyToken = token => {
	try {
		let js = jwt.verify(token, process.env.PUBLIC_KEY, {
			algorithm: "RS256"
		})
		return js
	} catch {
		return undefined
	}
}

function getSubmissionWithId(req,res) {
	const probId = req.params.probId
	var token = req.headers.authorization.split(" ")[1]
	const userData = verifyToken(token)
	var sql = `select submissionId,verdict,errmsg,state,score from submission 
		where userId = ? and probId = ? order by submissionId desc limit 1`
	db.query(sql,[userData.id,probId],(err,result) => {
		err ? res.status(500).send('') :
		res.status(200).json(result[0])
	})
}

module.exports = {
    getSubmissionWithId
}