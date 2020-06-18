const express = require('express')
const router = express.Router()
const users = require('./users')
const problems = require('./problems')
const submissions = require('./submissions')

router.get('/', (req, res) => {
    res.send('openGOTO API Service')
  })

router.post('/login',users.login)
router.get('/scode/:probId',users.viewScode)
router.post('/upload', users.multerConfig.single('file'), users.uploadFie)
router.get('/problem',problems.getProblem)
router.get('/submission/:probId',submissions.getSubmissionWithId)


module.exports = router