import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

const TimerCard = ({ currentTime }) => {
	const [timeLeft, setTimeLeft] = useState(currentTime)
	const countDown = () => setTimeLeft((prevTime) => prevTime - 1)

	useEffect(() => {
		const timer = setInterval(countDown, 1000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		if (timeLeft <= 0) {
			window.location.reload(false)
		}
	}, [timeLeft])

	const timeToString = (time) => {
		const hour = Math.floor(time / (60 * 60))
		const minuteDivisor = time % (60 * 60)
		const minute = Math.floor(minuteDivisor / 60)
		const secondsDivisor = minuteDivisor % 60
		const second = Math.ceil(secondsDivisor)

		return `${hour} h : ${minute} m : ${second} s`
	}

	return (
		<Card className='mb-5'>
			<Card.Body as='h1' className='text-center p-4'>
				{timeToString(timeLeft)}
			</Card.Body>
		</Card>
	)
}

export default TimerCard
