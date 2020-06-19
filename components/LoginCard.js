import { useState } from 'react'
import { login } from '../auth'
import {
	Row,
	Col,
	Card,
	Button,
	Form,
	Image,
	Modal,
	Alert,
	Container,
} from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'

const OutlineButton = styled(Button)`
	color: #ff851b;
	background-color: white;
	border-color: #ff851b;
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

const CustomForm = styled(Form.Control)`
	&:focus {
		border-color: #ff851b;
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #ff851b;
	}
`

const FadeIn = keyframes `
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`
const FadeOut = keyframes `
	0%{
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
`
const FadeOutCard = styled(Card)`
	background-color: #f7f7f7;
	width: 375px;
	animation: 1.3s ${FadeIn} ease-out;
` 

const LoginCard = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)

	const handleChangeUser = (event) => setUsername(event.target.value)
	const handleChangePass = (event) => setPassword(event.target.value)
	const closeAlert = () => setError(false)

	const handleSubmit = async (event) => {
		event.preventDefault()
		const url = `${process.env.API_URL}/api/login`
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			})
			if (response.ok) {
				const { token } = await response.json()
				login(token)
			} else {
				let error = new Error(response.statusText)
				console.log(error)
				setError(true)
			}
		} catch (error) {
			console.error(
				'You have an error in your code or there are Network issues.',
				error
			)
			throw new Error(error)
		}
	}

	return (
		<FadeOutCard>
			<Image
				src='otoglogo.png'
				style={{ width: '70px' }}
				className='mx-auto mt-4'
			/>
			<Card.Body as={Container}>
				<Modal show={!!error} onHide={closeAlert}>
					<Modal.Header closeButton>
						<Modal.Title>Login Failed !</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Alert variant='danger'>Username หรือ Password ไม่ถูกต้อง</Alert>
					</Modal.Body>
				</Modal>
				<Row className='d-flex justify-content-center'>
					<Col className='mx-auto px-5'>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Username </Form.Label>
								<CustomForm
									value={username}
									onChange={handleChangeUser}
									type='username'
									placeholder='Username'
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password </Form.Label>
								<CustomForm
									value={password}
									onChange={handleChangePass}
									type='password'
									placeholder='Password'
									required
								/>
							</Form.Group>
							<br />
							<OutlineButton type='submit' block>
								Login
							</OutlineButton>
						</Form>
					</Col>
				</Row>
				<br />
			</Card.Body>
		</FadeOutCard>
	)
}

export default LoginCard
