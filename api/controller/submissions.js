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
		if(err) return res.status(500).send('') 
		if(result[0]) res.status(200).json(
			{
				accept : (result[0].score === 100) ? true : (result[0].state) ? false : undefined,
				...result[0]
			})
		else res.status(200).json({state : -1})
	})
}

module.exports = {
    getSubmissionWithId
}