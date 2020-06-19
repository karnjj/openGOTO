import { useState, useEffect } from 'react'
import { Accordion, Row, Col, Card, Form, Button } from 'react-bootstrap'
import ResultTable from './ResultTable'
import styled from 'styled-components'
import vars from '../styles/vars'
import ViewCodeButton from './ViewCodeButton'
import { darken, opacify } from 'polished'
import { useAuthContext } from '../auth'

const CardHeader = styled(Card.Header)`
	background: ${(props) => (props.accept ? vars.headerAC : vars.headerDF)};
`

const ViewPDFButton = styled.a`
	background: ${vars.buttonGreen};
	border-color: ${vars.buttonGreen};
	color: white !important;
	&:hover,
	&:focus {
		background: ${darken(0.2, vars.buttonGreen)}!important;
		border-color: ${darken(0.2, vars.buttonGreen)}!important;
	}
	&:focus,
	&:active,
	&:visited {
		box-shadow: 0 0 0 0.2rem ${opacify(0.5, vars.buttonGreen)}!important;
	}
`
const SubmitButton = styled(Button)`
	background: ${vars.buttonOrange};
	border-color: ${vars.buttonOrange};
	color: white !important;
	&:hover,
	&:focus {
		background: ${darken(0.2, vars.buttonOrange)}!important;
		border-color: ${darken(0.2, vars.buttonOrange)}!important;
	}
`

const TaskCard = (props) => {
	const { userData, token } = useAuthContext()
	const { id: userId } = userData
	const { problemId, name } = props
	const [file, setFile] = useState(null)

	const [result, setResult] = useState(null)
	const { accept } = result ?? {}
	const sent = accept !== undefined

	const selectFile = (event) => setFile(event.target.files[0])

	const uploadFile = async (e) => {
		e.preventDefault()
		if (!selectedFile) return
		const url = `${process.env.API_URL}/api/upload`
		const data = new FormData()
		data.append('probId', problemId)
		data.append('userId', userId)
		data.append('file', file, file.name)
		const respone = await fetch(url, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
			},
			body: data,
		})
		if (respone.ok) window.location.reload(false)
	}

	useEffect(() => {
		var waitingData
		const fetchData = async () => {
			const url = `${process.env.API_URL}/api/submission/${problemId}`
			const response = await fetch(url, {
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			const json = await response.json()
			console.log(json)
			const { state } = json
			if (state === 0) {
				setResult(json)
				waitingData = setTimeout(fetchData, 1000)
			} else if (state == 1) {
				setResult(json)
			} else if (state == -1) {
				setResult({ verdict: '-', score: '-' })
			}
		}
		fetchData()
		return () => clearTimeout(waitingData)
	}, [])

	return (
		<Accordion as={Card} defaultActiveKey='0' className='mb-4'>
			<Accordion.Toggle as={CardHeader} eventKey='0' accept={accept}>
				<h5 className='my-1'>
					Problem {problemId}: {name}
				</h5>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='0'>
				<Card.Body as={Row} className='p-5 align-items-center'>
					<Col className='ml-2 mr-5 d-flex justify-content-center'>
						<ResultTable {...result} />
					</Col>
					<Col style={{ maxWidth: '290px' }}>
						<Form.File
							as={Col}
							className='mb-3'
							label={'Choose file' || file.name}
							accept='.c,.cpp'
							onChange={selectFile}
							custom
						/>
						<div className='d-flex justify-content-between'>
							<ViewCodeButton problemId={problemId} sent={sent} />
							<ViewPDFButton
								className='btn btn-success'
								target='_blank'
								href={`${process.env.API_URL}/api/docs/${problemId}`}
							>
								View PDF
							</ViewPDFButton>
							<SubmitButton
								variant='warning'
								type='submit'
								onClick={uploadFile}
							>
								Submit
							</SubmitButton>
						</div>
					</Col>
				</Card.Body>
			</Accordion.Collapse>
		</Accordion>
	)
}

export default TaskCard
