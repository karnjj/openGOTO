import { useState, useEffect, useRef } from 'react'

import PageLayout from '../components/PageLayout'
import { Row, Col, Jumbotron } from 'react-bootstrap'
import TaskCard from '../components/TaskCard'
import TimerCard from '../components/TimerCard'
import AnnounceCard from '../components/AnnounceCard'

import { withAuthSync, useAuthContext } from '../auth'
import styled from 'styled-components'

const Announce = styled(Jumbotron)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 45vh;
	h1 {
		font-size: 3.5rem;
	}
`

const TaskCards = ({ start, end, serverTime }) => {
	const { token } = useAuthContext()
	const [problem, setProblem] = useState(null)

	useEffect(() => {
		let cancelled = false
		const fetchData = async () => {
			const url = `${process.env.API_URL}/api/problem`
			let headers = { 'Content-Type': 'application/json' }
			headers['authorization'] = token
			const res = await fetch(url, { headers })
			const json = await res.json()
			if (!cancelled) {
				setProblem(json.problem)
			}
		}
		fetchData()
		return () => (cancelled = true)
	}, [])

	return (
		<PageLayout>
			<Row xs={1}>
				<Col lg={8} className='pr-0 pr-5'>
					{problem?.map((taskData, index) => (
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

const WaitingAnnounce = ({ start, serverTime }) => {
	const timeLeft = useRef(serverTime - start)
	const countDown = () => (timeLeft.current -= 1)
	const date = new Date(serverTime)

	useEffect(() => {
		const timer = setInterval(countDown, 1000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		if (timeLeft <= 0) {
			window.location.reload(false)
		}
	}, [timeLeft.current])

	return (
		<PageLayout container={false}>
			<Announce>
				<h1>การสอบจะเริ่มตอน</h1>
				<h2>{`${date.getHours} : ${date.getMinutes}`}</h2>
			</Announce>
		</PageLayout>
	)
}

const EndingAnnounce = (props) => {
	return (
		<PageLayout container={false}>
			<Announce>
				<h1>หมดเวลาทำข้อสอบ</h1>
			</Announce>
		</PageLayout>
	)
}

const Index = (props) => {
	const { start, end, serverTime } = props
	const isStarting = serverTime < start
	const isHolding = start < serverTime && serverTime < end

	return isStarting ? (
		<WaitingAnnounce {...props} />
	) : isHolding ? (
		<TaskCards {...props} />
	) : (
		<EndingAnnounce />
	)
}

Index.getInitialProps = async (ctx) => {
	const url = `${process.env.API_URL}/api/contest`
	let headers = { 'Content-Type': 'application/json' }
	const res = await fetch(url, { headers })
	const json = await res.json()

	return { ...json }
}

export default withAuthSync(Index)
