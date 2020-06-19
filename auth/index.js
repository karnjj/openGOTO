import { useEffect, useContext, createContext } from 'react'
import Error from 'next/error'
import cookie from 'js-cookie'
import decoder from 'jwt-decode'
import router from 'next/router'
import nextCookie from 'next-cookies'

export const login = (token) => {
	cookie.set('token', token)
	router.push('/')
}

export const auth = async (token) => {
	return token && decoder(token)
}

export const logout = () => {
	cookie.remove('token')
	router.push('/login')
}

export const withAuthSync = (WrappedComponent) => {
	const Wrapper = ({ token, userData, ...rest }) => {
		const syncLogout = (event) => {
			if (event.key === 'logout') {
				console.log('logged out from storage!')
				window.location.reload(false)
			}
		}
		useEffect(() => {
			window.addEventListener('storage', syncLogout)
			return () => {
				window.removeEventListener('storage', syncLogout)
				window.localStorage.removeItem('logout')
			}
		}, [])
		return userData ? (
			<AuthProvider value={{ userData, token }}>
				<WrappedComponent {...rest} />
			</AuthProvider>
		) : (
			<Error statusCode={404} />
		)
	}
	Wrapper.getInitialProps = async (ctx) => {
		const componentProps =
			WrappedComponent.getInitialProps &&
			(await WrappedComponent.getInitialProps(ctx))
		const { token } = nextCookie(ctx)
		const userData = await auth(token)
		return { ...componentProps, token, userData }
	}
	return Wrapper
}

export const AuthContext = createContext()
export const AuthProvider = (props) => <AuthContext.Provider {...props} />
export const useAuthContext = () => {
	return useContext(AuthContext)
}

// export const isAdmin = (userData) => !!userData && userData.state === 0

// export const withAdminAuth = (WrappedComponent) => {
// 	const Wrapper = (props) => {
// 		const userData = useAuthContext()
// 		return isAdmin(userData) ? (
// 			<WrappedComponent {...props} />
// 		) : (
// 			<Error statusCode={404} />
// 		)
// 	}
// 	Wrapper.getInitialProps = async (ctx) => {
// 		const componentProps =
// 			WrappedComponent.getInitialProps &&
// 			(await WrappedComponent.getInitialProps(ctx))
// 		return { ...componentProps }
// 	}
// 	return withAuthSync(Wrapper)
// }
