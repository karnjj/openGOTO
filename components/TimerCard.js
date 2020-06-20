import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

export const CountDownTimer = ({ currentTime, mode = 'en' }) => {
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

	const toTimeObject = (time) => {
		const hour = Math.floor(time / (60 * 60))
		const minuteDivisor = time % (60 * 60)
		const minute = Math.floor(minuteDivisor / 60)
		const secondsDivisor = minuteDivisor % 60
		const second = Math.ceil(secondsDivisor)
		return { hour, minute, second }
	}

	const timeToString = (time) => {
		const { hour, minute, second } = toTimeObject(time)
		return `${hour} h : ${minute} m : ${second} s`
	}

	const timeToStringTh = (time) => {
		const { hour, minute, second } = toTimeObject(time)
		const h = `${hour} ชั่วโมง `
		const m = `${minute} นาที `
		const s = `${second} วินาที `
		const day = Math.ceil(hour / 24)
		if (hour > 24) {
			return `${day} วัน`
		}
		if (hour) {
			if (minute) {
				return h + m + s
			}
			return h + s
		} else if (minute) {
			return m + s
		} else if (second) {
			return s
		}
	}
	return (
		<div className='text-center'>
			{mode == 'th' ? timeToStringTh(timeLeft) : timeToString(timeLeft)}
		</div>
	)
}

export const TimerCard = (props) => {
	return (
		<Card className='mb-5'>
			<Card.Body as='h1' className='text-center p-4'>
				<CountDownTimer {...props} />
			</Card.Body>
		</Card>
	)
}
