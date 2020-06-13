const { Card } = require('react-bootstrap')

const TimerCard = (props) => (
	<Card className='mb-5'>
		<Card.Body as='h1' className='text-center p-4'>
			80 h : 14 m : 11 s
		</Card.Body>
	</Card>
)

export default TimerCard
