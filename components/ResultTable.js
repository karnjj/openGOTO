import { Table, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import vars from '../styles/vars'

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

const ResultTable = ({ state, accept, verdict, score }) => {
	return state === undefined ? (
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
					<td className='py-3'>{verdict}</td>
					<td className='py-3'>{score}</td>
				</tr>
			</tbody>
		</StyledTable>
	)
}

export default ResultTable
