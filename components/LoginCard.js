
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { CardText } from 'react-bootstrap/Card';

const OutlineButton = styled(Button)`
  color: #ff851b;
  background-color: white;
  border-color: #ff851b;
  width: 390px;
  &:hover, 
  &:focus{
    background-color: #ff851b;
    border-color: #ff851b;      
  }
  &:visited,
  &:active{
    background-color: #ff851b !important;
    border-color: #ff851b !important;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #ff851b !important;
  }

`;

const CustomTitle = styled(Card.Title)`
  padding-top: 50px;
  font-size: 30px;
`;

const CustomForm = styled(Form.Control)`
  &:focus{
      border-color: #ff851b;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #ff851b;
  }
`;

const LoginCard = () => {
    return (
        <Container>
            <Row>
                <Col md="3"></Col>
                <Col as="Card">
                    <Card style={{ backgroundColor: "#f7f7f7" }}>
                        <CustomTitle className="mx-auto">openGOTO</CustomTitle>
                        <Card.Body as="Container">
                            <Row>
                                <Col md="1"></Col>
                                <Col className="mx-auto">
                                    <Form style = {{paddingBottom: "29px"}}>
                                        <Form.Group controlId="username_form">
                                            <Form.Label>Username: </Form.Label>
                                            <CustomForm type="text" placeholder="Username" />
                                        </Form.Group>
                                        <Form.Group controlId="password_form">
                                            <Form.Label>Password: </Form.Label>
                                            <CustomForm type="password" placeholder="Password" />
                                        </Form.Group>
                                    </Form>
                                    <OutlineButton>Login</OutlineButton>
                                </Col>
                                <Col md="1"></Col>
                            </Row><br />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="3"></Col>

            </Row>
        </Container>
    )
}

export default LoginCard