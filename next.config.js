const withCSS = require('@zeit/next-css')

const prod = process.env.NODE_ENV === 'production'

module.exports = withCSS({
	env: {
		API_URL: prod ? 'http://192.168.0.197' : 'http://locahost:8000',
	},
})
