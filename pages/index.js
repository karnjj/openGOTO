import { useState, useEffect, useRef } from 'react'

import PageLayout from '../components/PageLayout'
import { Row, Col, Jumbotron, Container, Card } from 'react-bootstrap'
import TaskCard from '../components/TaskCard'
import { TimerCard, CountDownTimer } from '../components/TimerCard'
import AnnounceCard from '../components/AnnounceCard'
import vars from "../styles/vars"
import { withAuthSync, useAuthContext } from '../auth'
import styled, {keyframes} from 'styled-components'

const Announce = styled(Jumbotron)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 45vh;
	h1 {
		font-size: 3.5rem;
	}
`
const WaitingTitle = styled(Card.Title)`
	font-size: 36px; 
	color: ${vars.white}; 
	font-weight: bold;
`
const WaitingBody = styled(Card.Body)`
	font-size: 98px; 
	color: ${vars.white}; 
	font-weight: 800;
`
const FadeIn = keyframes `
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`
const WaitingCard = styled(Card)`
	background: none;
	border-color: transparent;
	animation: ${FadeIn} 1.3s linear;
`

const GradiantContainer = styled(Container)`
	background-image: linear-gradient(60deg, #ff851b 10%, #ec88c2 90%);
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
					<TimerCard currentTime={end - serverTime} />
					<AnnounceCard />
				</Col>
			</Row>
		</PageLayout>
	)
}

const WaitingAnnounce = ({ start, serverTime }) => {
	const timeLeft = useRef(serverTime - start)
	const countDown = () => (timeLeft.current -= 1)
	const date = new Date(start*1000)

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
		<GradiantContainer
			fluid
			className='d-flex align-items-center justify-content-center'
			style={{ height: '100vh' }}
		>
			<WaitingCard className='d-flex align-items-center justify-content-center'>
				<WaitingTitle>การสอบจะเริ่มต้นขึ้นในอีก</WaitingTitle>
				<WaitingBody>
					<CountDownTimer currentTime={start - serverTime}/>
				</WaitingBody>
			</WaitingCard>
		</GradiantContainer>
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
	console.log(props);
	const { start, end, serverTime } = props
	const isStarting = serverTime < start
	const isHolding = start <= serverTime && serverTime < end

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
