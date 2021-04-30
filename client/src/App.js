import { useState, useEffect, useReducer } from 'react';
import './App.css';

import { 
    Row,
    Col,
    Container,
    Card,
    CardBody,
    Table
} from 'reactstrap';

import { PercentPieChart } from "./_components";

const reducer = (state, action) => {
    switch(action.type) {
        case "assign":
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [state, dispatch] = useReducer(reducer, {});
    const [sysInfo, setSysInfo] = useState({})

    useEffect(() => {
        var apiAppend = process.env.NODE_ENV === 'production' ? 
            process.env.REACT_APP_PROD_API_APPEND : 
            process.env.REACT_APP_DEV_API_APPEND;

        var originBaseUrl = 'http://' + window.location.hostname + apiAppend;

        const intervalId = setInterval(() => {  
            fetch(`${originBaseUrl}/monitor`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        dispatch({type: "assign", payload: result});
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }, 5000)

        fetch(`${originBaseUrl}/sysinfo`)
            .then(res => res.json())
            .then((result) => {
                setSysInfo(result)
            })
        
        return () => clearInterval(intervalId);
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container fluid>
                <Row>
                    <Col xs="12 text-center"><h1>Site Monitor</h1></Col>
                    <Col xs="12" md="4">
                        <div className="text-center">CPU Utilization</div>
                        <PercentPieChart systemData={state.cpu_usage}/>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="text-center">HDD Utilization</div>
                        <PercentPieChart systemData={state.hdd_percent}
                            secondaryLabel={`${state.hdd_used}/${state.hdd_total} Used`}
                            />
                    </Col>
                    <Col xs="12" md="4">
                        <div className="text-center">Memory Utilization</div>
                        <PercentPieChart systemData={state.percent_mem}
                            secondaryLabel={`${state.used_mem}/${state.mem_total} Used`}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="sysinfo-card">
                            <CardBody>
                                <Table borderless>
                                    <tbody>
                                        <tr>
                                            <td>CPU:</td>
                                            <td>{sysInfo.cpu}</td>
                                        </tr>
                                        <tr>
                                            <td>Arch:</td>
                                            <td>{sysInfo.arch}</td>
                                        </tr>
                                        <tr>
                                            <td>Cores / Threads:</td>
                                            <td>{`${sysInfo.cpu_count} / ${sysInfo.thread_count}`}</td>
                                        </tr>
                                        <tr>
                                            <td>OS:</td>
                                            <td>{sysInfo.os}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
