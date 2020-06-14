import { useState } from 'react'
import {
	Accordion,
	useAccordionToggle,
	Row,
	Col,
	Card,
	Form,
	Button,
} from 'react-bootstrap'
import ResultTable from './ResultTable'
import styled from 'styled-components'
import vars from '../styles/vars'
import ViewCodeButton from './ViewCodeButton'
import { darken, opacify } from 'polished'

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
	const { problemId, problemName, result, accept, submissionId } = props
	// const userData = useAuthContext()
	// const [selectedFile, setSelectedFile] = useState(undefined)
	// const [fileName, setFileName] = useState('')
	// const [fileLang, setFileLang] = useState('C++')
	// const [solved, setSolved] = useState(false)
	// const [idBest, setIdBest] = useState(-1)
	// const [passed, setPassed] = useState(whopass)

	const CustomToggle = (props) => {
		const [isHidden, setIsHidden] = useState(false)
		const handleClick = useAccordionToggle(props.eventKey, () => {
			setIsHidden(!isHidden)
		})
		return (
			<Accordion.Toggle
				{...props}
				as={Icon}
				className='float-right'
				icon={isHidden ? faChevronDown : faChevronUp}
				onClick={handleClick}
			/>
		)
	}
	// const selectFile = (event) => {
	// 	if (event.target.files[0] !== undefined) {
	// 		setSelectedFile(event.target.files[0])
	// 		setFileName(event.target.files[0].name)
	// 	} else {
	// 		setSelectedFile(undefined)
	// 		setFileName('')
	// 	}
	// }
	// const uploadFile = async (e) => {
	// 	e.preventDefault()
	// 	if (selectedFile === undefined) return false
	// 	const data = new FormData()
	// 	data.append('file', selectedFile)
	// 	data.append('fileLang', fileLang)
	// 	const url = `${process.env.API_URL}/api/upload/${id_Prob}?contest=${idContest}`
	// 	const respone = await fetch(url, {
	// 		method: 'POST',
	// 		headers: {
	// 			authorization: userData ? userData.id : '',
	// 		},
	// 		body: data,
	// 	})
	// 	if (respone.ok) window.location.reload(false)
	// }
	// const quickResend = async () => {
	// 	if (idBest != -1) {
	// 		const url = `${process.env.API_URL}/api/contest/quickresend`
	// 		const response = await fetch(url, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({ id: idBest }),
	// 		})
	// 		if (response.ok) window.location.reload(false)
	// 	}
	// }
	// const callbackFunc = (ChildData, id) => {
	// 	if (ChildData == 100) setSolved(true)
	// 	setIdBest(id)
	// }

	return (
		<Accordion as={Card} defaultActiveKey='0' className='mb-4'>
			<Accordion.Toggle as={CardHeader} eventKey='0' accept={accept}>
				<h5 className='my-1'>
					Problem {problemId}: {problemName}
				</h5>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='0'>
				<Card.Body as={Row} className='p-5 align-items-center'>
					<Col className='ml-2 mr-5'>
						<ResultTable result={result} accept={accept} />
					</Col>
					<Col style={{ maxWidth: '290px' }}>
						<Form.File
							as={Col}
							className='mb-3'
							label={'Choose file' || fileName}
							accept='.c,.cpp'
							// onChange={selectFile}
							custom
						/>
						<div className='d-flex justify-content-between'>
							<ViewCodeButton submissionId={submissionId} />
							<ViewPDFButton
								className='btn btn-success'
								target='_blank'
								// href={`${process.env.API_URL}/api/docs/${sname}`}
							>
								View PDF
							</ViewPDFButton>
							<SubmitButton
								variant='warning'
								type='submit'
								onClick={undefined /*uploadFile*/}
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
