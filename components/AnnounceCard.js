import { Card } from 'react-bootstrap'

const AnnounceCard = () => {
	return (
		<Card>
			<Card.Header className='text-center' as='h4'>
				Announcement
			</Card.Header>
			<Card.Body>
				<ul>
					<li>ต่อเวลา 30 นาที</li>
					<li>แก้ไข document ข้อที่ 1</li>
					<li>เซาถะแหมะ</li>
				</ul>
			</Card.Body>
		</Card>
	)
}

export default AnnounceCard
