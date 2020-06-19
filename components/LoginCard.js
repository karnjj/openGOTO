import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { CardText } from 'react-bootstrap/Card'

const OutlineButton = styled(Button)`
	color: #ff851b;
	background-color: white;
	border-color: #ff851b;
	width: 390px;
	&:hover,
	&:focus {
		background-color: #ff851b;
		border-color: #ff851b;
	}
	&:visited,
	&:active {
		background-color: #ff851b !important;
		border-color: #ff851b !important;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #ff851b !important;
	}
`

const CustomTitle = styled(Card.Title)`
	padding-top: 50px;
	font-size: 30px;
`

const CustomForm = styled(Form.Control)`
	&:focus {
		border-color: #ff851b;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #ff851b;
	}
`

const LoginCard = () => {
	return (
		<Card style={{ backgroundColor: '#f7f7f7' }}>
			<CustomTitle className='mx-auto'>openGOTO</CustomTitle>
			<Card.Body as='Container'>
				<Row className='d-flex justify-content-center px-0 px-md-5'>
					<Col className='mx-auto'>
						<Form className='pb-4'>
							<Form.Group controlId='username_form'>
								<Form.Label>Username: </Form.Label>
								<CustomForm type='text' placeholder='Username' />
							</Form.Group>
							<Form.Group controlId='password_form'>
								<Form.Label>Password: </Form.Label>
								<CustomForm type='password' placeholder='Password' />
							</Form.Group>
						</Form>
						<OutlineButton>Login</OutlineButton>
					</Col>
				</Row>
				<br />
			</Card.Body>
		</Card>
	)
}

export default LoginCard
