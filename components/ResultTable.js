import { Table } from 'react-bootstrap'
import styled from 'styled-components'
import vars from '../styles/vars'

const StyledTable = styled(Table)`
	text-align: center;
`

const ResultTable = ({ result }) => {
	const [cases, score] = result
	return (
		<StyledTable size='sm' bordered className='mb-0'>
			<tbody>
				<tr>
					<th rowSpan='2' />
					<th>Result</th>
					<th>Score</th>
				</tr>
				<tr>
					<td className='py-3'>{cases}</td>
					<td className='py-3'>{score}</td>
				</tr>
			</tbody>
		</StyledTable>
	)
}

export default ResultTable
