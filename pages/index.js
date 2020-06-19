import PageLayout from '../components/PageLayout'
import { Row, Col } from 'react-bootstrap'
import TaskCard from '../components/TaskCard'
import TimerCard from '../components/TimerCard'
import AnnounceCard from '../components/AnnounceCard'

import { withAuthSync } from '../auth'

const Index = ({ tasks, serverTime = 1500 }) => {
	return (
		<PageLayout>
			<Row xs={1}>
				<Col lg={8} className='pr-0 pr-5'>
					{tasks?.map((taskData, index) => (
						<TaskCard key={index} {...taskData} />
					))}
				</Col>
				<Col lg={4}>
					<TimerCard currentTime={serverTime} />
					<AnnounceCard />
				</Col>
			</Row>
		</PageLayout>
	)
}

Index.getInitialProps = async (ctx) => {
	const url = `${process.env.API_URL}/api/problem`
	let headers = { 'Content-Type': 'application/json' }
	const res = await fetch(url, { headers })
	const json = await res.json()
	return { tasks: json.problem, serverTime: json.serverTime }
}

export default withAuthSync(Index)
