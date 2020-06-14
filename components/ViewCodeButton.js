import { useState, useEffect } from 'react'

import { Modal, Button } from 'react-bootstrap'

import styled from 'styled-components'
import prism from 'prismjs'

const FontPre = styled.pre`
	span,
	code {
		font-family: 'Fira Code', monospace, 'Courier New', Courier;
	}
`

const ViewCodeButton = (props) => {
	const { submissionId } = props

	const [show, setShow] = useState(false)
	const [sourceCode, setSourceCode] = useState('')

	const handleClose = () => setShow(false)
	const handleShow = async () => {
		// let url = resultId
		// 	? `${process.env.API_URL}/api/scode?idSubmit=${resultId}`
		// 	: `${process.env.API_URL}/api/scode?idProb=${probId}`
		// let headers = { 'Content-Type': 'application/json' }
		// headers['authorization'] = token ? token : ''
		// const response = await fetch(url, { headers })
		// const data = await response.json()
		// setSourceCode(data.src)
		setSourceCode('#include <iostream>')
		setShow(true)
	}

	useEffect(() => {
		if (show) {
			prism.highlightAll()
		}
	}, [show])

	return (
		<>
			<Button onClick={handleShow} disabled={!submissionId}>
				🔎
			</Button>
			<Modal show={show} onHide={handleClose} centered size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>Submission : {submissionId}</Modal.Title>
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
