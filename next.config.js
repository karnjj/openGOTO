const withCSS = require('@zeit/next-css')

const prod = process.env.NODE_ENV === 'production'

module.exports = withCSS({
	env: {
		API_URL: prod ? '' : 'http://localhost:8000',
	},
})
