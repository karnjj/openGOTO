import PageLayout from '../components/PageLayout'
import { Row, Col } from 'react-bootstrap'
import TaskCard from '../components/TaskCard'
import TimerCard from '../components/TimerCard'
import AnnounceCard from '../components/AnnounceCard'

const tasks = [
	{
		problemId: 1,
		problemName: 'Bomb',
		result: ['PPPPPPPPPP', 100],
		submissionId: 101,
		success: true,
	},
	{
		problemId: 2,
		problemName: 'Sword',
		result: ['PPPPPPPTTT', 70],
		submissionId: 202,
		success: false,
	},
	{
		problemId: 3,
		problemName: 'Bomb',
		result: ['-', '-'],
		submissionId: 303,
		success: undefined,
	},
]
const serverTime = 1500

const Index = () => {
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

export default Index
