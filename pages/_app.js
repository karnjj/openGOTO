import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { createGlobalStyle } from 'styled-components'
import vars from '../styles/vars'
config.autoAddCss = false

const GlobalStyle = createGlobalStyle`
    body {
        overflow-y: scroll;
    }
    ::selection {
        color: ${vars.lightGray};
        background: ${vars.orange};
    }
`

const MyApp = (props) => {
	const { Component, pageProps } = props
	return (
		<>
			<Head>
				<title>KKU Contest</title>
				{/* <link rel='manifest' href='/manifest.json' /> */}
				{/* <link rel='apple-touch-icon' href='/logoIOS.png' /> */}
				<link rel='shortcut icon' href='/logo196.png' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link
					href='https://fonts.googleapis.com/css?family=Fira+Code&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
					rel='stylesheet'
				/>
				<meta name='theme-color' content='#ff851b' />
			</Head>
			<>
				<GlobalStyle />
				<Component {...pageProps} />
			</>
		</>
	)
}

export default MyApp
