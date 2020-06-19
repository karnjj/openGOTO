import { useState, useEffect } from 'react'

import { Modal, Button } from 'react-bootstrap'

import styled from 'styled-components'
import prism from 'prismjs'
import vars from '../styles/vars'
import { useAuthContext } from '../auth'

const FontPre = styled.pre`
	span,
	code {
		font-family: 'Fira Code', monospace, 'Courier New', Courier;
	}
`
const StyledButton = styled(Button)`
	background: ${vars.buttonGray};
	border-color: ${vars.buttonGray};
`

const ViewCodeButton = ({ problemId, sent }) => {
	const { token } = useAuthContext()
	const [show, setShow] = useState(false)
	const [sourceCode, setSourceCode] = useState('')

	const handleClose = () => setShow(false)
	const handleShow = async () => {
		let url = `${process.env.API_URL}/api/scode/${problemId}`
		let headers = { 'Content-Type': 'application/json' }
		headers['authorization'] = `Bearer ${token}`
		const response = await fetch(url, { headers })
		const json = await response.json()
		setSourceCode(json.scode)
		setShow(true)
	}

	useEffect(() => {
		if (show) {
			prism.highlightAll()
		}
	}, [show])

	return (
		<>
			<StyledButton variant='secondary' onClick={handleShow} disabled={!sent}>
				🔎
			</StyledButton>
			<Modal show={show} onHide={handleClose} centered size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>Submission : {problemId}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FontPre className='line-numbers'>
						<code className='language-cpp'>{sourceCode}</code>
					</FontPre>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default ViewCodeButton
