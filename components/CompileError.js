import styled from 'styled-components'
import vars from '../styles/vars'
import { Modal } from 'react-bootstrap'
import prism from 'prismjs'
import { useState, useEffect } from 'react'

const ToggleText = styled.a`
	color: ${(props) => (props.black ? vars.black : vars.orange)}!important;
	&:hover {
		color: ${vars.orange}!important;
		cursor: pointer !important;
	}
`
const FontPre = styled.pre`
	span,
	code {
		font-family: 'Fira Code', monospace, 'Courier New', Courier;
	}
`
const CompileError = ({ errmsg, verdict }) => {
	const [showError, setShowError] = useState(true)
	const handleShow = () => setShowError(true)
	const handleClose = () => setShowError(false)

	useEffect(() => {
		if (showError) {
			prism.highlightAll()
		}
	}, [showError])

	return (
		<>
			<ToggleText black onClick={handleShow}>
				{verdict}
			</ToggleText>
			<Modal show={showError} onHide={handleClose} centered size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>Compile Error</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FontPre>
						<code className={`language-cpp`}>{errmsg}</code>
					</FontPre>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default CompileError
