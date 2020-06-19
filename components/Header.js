import { Navbar, Button } from 'react-bootstrap'
import styled from 'styled-components'
import vars from '../styles/vars'
import { darken, opacify } from 'polished'
import { logout, useAuthContext } from '../auth'

const StyledNavbar = styled(Navbar)`
	background: ${vars.lightGray};
	a,
	h4 {
		color: ${vars.black}!important;
	}
	button {
		color: ${vars.white}!important;
	}
`
const LogoutButton = styled(Button)`
	background: ${vars.otog};
	border-color: ${vars.otog};
	color: white !important;
	&:hover,
	&:focus {
		background: ${vars.red}!important;
		border-color: ${vars.red}!important;
	}
	&:focus,
	&:active,
	&:visited {
		box-shadow: 0 0 0 0.2rem ${vars.lightGray}!important;
	}
	padding: 6px 24px;
`

const Header = () => {
	const { userData } = useAuthContext()
	const { sname } = userData
	return (
		<StyledNavbar expand='lg' className='justify-content-between px-5'>
			<Navbar.Brand>POSN KKU</Navbar.Brand>
			<h4 className='my-auto'>สวัสดี ! {sname}</h4>
			<LogoutButton onClick={logout} variant='danger'>
				Logout
			</LogoutButton>
		</StyledNavbar>
	)
}

export default Header
