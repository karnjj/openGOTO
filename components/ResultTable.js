import { Table, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import vars from '../styles/vars'
import CompileError from './CompileError'

const StyledTable = styled(Table)`
	text-align: center;
`
const TaskStatus = styled.th`
	background: ${(props) => {
		switch (props.accept) {
			case true:
				return vars.statusAC
			case false:
				return vars.statusWA
			default:
				return vars.statusDF
		}
	}};
`
const ResultCode = styled.code`
	color: ${vars.black};
	font-size: 16px;
`
const ResultTable = (props) => {
	const { state, accept, verdict, score, errmsg } = props
	return state === 0 ? (
		<Spinner animation='border' role='status'>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	) : (
		<StyledTable size='sm' bordered className='mb-0'>
			<tbody>
				<tr>
					<TaskStatus rowSpan='2' accept={accept} />
					<th>Result</th>
					<th>Score</th>
				</tr>
				<tr>
					<td className='py-3'>
						<ResultCode>
							{errmsg ? <CompileError {...props} /> : verdict}
						</ResultCode>
					</td>
					<td className='py-3'>{score}</td>
				</tr>
			</tbody>
		</StyledTable>
	)
}

export default ResultTable
