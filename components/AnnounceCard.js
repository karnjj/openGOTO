import { Card } from 'react-bootstrap'

const AnnounceCard = () => {
	return (
		<Card>
			<Card.Header className='text-center' as='h4'>
				Announcement
			</Card.Header>
			<Card.Body>
				<ul>
					<li>
						C++ Reference :{' '}
						<a href='https://en.cppreference.com/w/'>
							https://en.cppreference.com/w/
						</a>
					</li>
				</ul>
			</Card.Body>
		</Card>
	)
}

export default AnnounceCard
