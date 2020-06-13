import Header from './Header'
import { Container } from 'react-bootstrap'

const PageLayout = ({ children }) => (
	<>
		<Header />
		<Container className='py-5'>{children}</Container>
	</>
)

export default PageLayout
