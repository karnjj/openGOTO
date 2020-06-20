import { Container } from 'react-bootstrap'
import LoginCard from '../components/LoginCard'
import styled from 'styled-components'

const GradiantContainer = styled(Container)`
	background-image: linear-gradient(60deg, #ff851b 10%, #ec88c2 90%);
`
const Login = () => {
	return (
		<GradiantContainer
			fluid
			className='d-flex align-items-center justify-content-center'
			style={{ height: '100vh' }}
		>
			<LoginCard />
		</GradiantContainer>
	)
}
export default Login
