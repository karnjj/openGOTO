const db = require('../models/database').Pool

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

function getProblem(req,res) {
    var sql = 'select * from config limit 1'
    db.query(sql,(err,config) => {
        config = config[0]
        const curTime = Math.floor(Date.now()/1000)
        if(config.start <= curTime && curTime <= config.end) {
            var sql = `select * from problem`
            db.query(sql,(err,problem) => {
                if(err) return res.status(500).send('')
                return res.status(200).json({problem})
            })
        }else return res.status(200).json({problem : []})
    })
}

function getDocs(req,res) {
    const token = req.cookies.token
    const userData = verifyToken(token)
    if(!userData) return res.status(401).send('')
    var sql = 'select * from config limit 1'
    db.query(sql , (err,config) => {
        config = config[0]
        const curTime = Math.floor(Date.now()/1000)
        if(config.start <= curTime && curTime <= config.end) {
            return res.sendFile(`${process.cwd()}/docs/${req.params.probId}.pdf`)
        }else return res.status(401).send('')
    })

	
}

module.exports = {
    getProblem,
    getDocs
}