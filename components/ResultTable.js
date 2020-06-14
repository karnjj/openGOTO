import { Table } from 'react-bootstrap'
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

const ResultTable = ({ result, accept }) => {
	return (
		<StyledTable size='sm' bordered className='mb-0'>
			<tbody>
				<tr>
					<TaskStatus rowSpan='2' accept={accept} />
					<th>Result</th>
					<th>Score</th>
				</tr>
				<tr>
					{result?.map((res, index) => (
						<td className='py-3' key={index}>
							{res}
						</td>
					))}
				</tr>
			</tbody>
		</StyledTable>
	)
}

export default ResultTable
