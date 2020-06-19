import Header from './Header'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const FullHeightContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const PageLayout = ({ children, container = true }) => (
	<FullHeightContainer>
		<Header />
		{container ? (
			<Container className='py-5'>{children}</Container>
		) : (
			<>{children}</>
		)}
		<hr />
	</FullHeightContainer>
)

export default PageLayout
