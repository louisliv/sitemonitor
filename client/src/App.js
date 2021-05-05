import { UIView } from '@uirouter/react';
import { Container, Col, Row } from "reactstrap";
import Sidebar from "./sidebar";

import './App.css';

function App() {
    return (
        <Container fluid className="no-padding">
            <Row className="no-margin">
                <Col xs="12" md="1" className="no-padding sidebar-col">
                    <Sidebar />
                </Col>
                <Col xs="12" md="11" className="no-padding main-col">
                    <Container fluid>
                        <UIView />
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default App;
