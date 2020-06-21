const db = require('../models/database').Pool
const jwt = require('jsonwebtoken')
const multer = require('multer')
const mkdirp = require('mkdirp')
const fs = require('fs')

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

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		var userId = Number(req.body.userId)
		var probId = Number(req.body.probId)
		mkdirp(`upload/${userId}/${probId}`).then(() => {
			cb(null, `upload/${userId}/${probId}`)
		})
	},
	filename: function (req, file, cb) {
		const timeStamp = Math.floor(Date.now()/1000)
		cb(null, `${timeStamp}.cpp`)
	}
})
const multerConfig = multer({ storage: storage })

async function login(req,res) {
	const { username, password } = req.body
	console.log(username + ' Sign in at' + Date(Date.now()));
	let sql = `select * from user where username = ?`
	var result = await new Promise((resolve, reject) => {
		db.query(sql,[username], (err, result) => {
			err ? reject(err) : resolve(result[0])
		})
	})
	if (!result) res.status(401).json({msg : 'Username not found'})
	else if (result.password != password) res.status(401).json({msg :'Password incorrect'})
	else {
		const {
			userId,
			sname
		} = result
		const data = { id: userId, sname: sname}
		let token = jwt.sign(data, process.env.SECRET_KEY, {
			algorithm: "RS256",
		})
		res.status(200).json({token,msg:"success"})
	}
}

function uploadFie(req,res) {
	const { path, filename } = req.file
	const {	userId, probId } = req.body
	var scode = fs.readFileSync(path,'utf8');
	var time = Number(filename.split('.')[0])
	var sql = "insert into submission (time, userId, probId, state,scode) values ?";
	var values = [[time,Number(userId),Number(probId),0,scode],];
	db.query(sql, [values], (err, result) => (
		err ? res.status(500).send('') :
		res.status(200).json({ msg: 'Upload Complete' })
	))
}

function viewScode(req,res) {
	var probId = req.params.probId
	var token = req.headers.authorization.split(" ")[1]
	var userData = verifyToken(token)
	if(!userData) return res.status(403).send('')
	var sql = 'select scode from submission where userId = ? and probId = ? order by submissionId desc limit 1'
	db.query(sql,[userData.id, Number(probId)], (err,scode) => {
		err ? res.status(500).send(''):
		res.status(200).json(scode[0])
	})
}

module.exports = {
	login,
	multerConfig,
	uploadFie,
	viewScode
}