import { useState, useEffect, useReducer } from 'react';
import './App.css';

import { 
    Row,
    Col,
    Container,
    Card,
    CardBody
} from 'reactstrap';

import { PercentPieChart, CpuTempsChart } from "./_components";

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
            fetch(originBaseUrl)
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
                <Row className="margin-bottom">
                    <Col xs="12" className="text-center margin-bottom"><h1>Site Monitor</h1></Col>
                    <Col xs="12" md="4">
                        <div className="text-center label-margin-bottom">CPU Utilization</div>
                        <PercentPieChart systemData={state.cpu_usage}/>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="text-center label-margin-bottom">HDD Utilization</div>
                        <PercentPieChart systemData={state.hdd_percent}
                            secondaryLabel={`${state.hdd_used}/${state.hdd_total} Used`}
                            />
                    </Col>
                    <Col xs="12" md="4">
                        <div className="text-center label-margin-bottom">Memory Utilization</div>
                        <PercentPieChart systemData={state.percent_mem}
                            secondaryLabel={`${state.used_mem}/${state.mem_total} Used`}
                            />
                    </Col>
                </Row>
                <Row>
                    {state.cpu_temps ?
                        Object.keys(state.cpu_temps).map(key =>
                            <Col key={key} xs='12' md='6' className="margin-bottom">
                                <div className="label-margin-bottom">{`${key} Temp`}</div>
                                <CpuTempsChart cpuTemps={state.cpu_temps[key]}
                                    dataKey={key}/>
                            </Col>
                        ) : null
                    }
                </Row>
                <Row className="margin-bottom">
                    <Col>
                        <Card className="sysinfo-card">
                            <CardBody>
                                <Row>
                                    <Col xs='6' className="text-center">CPU:</Col>
                                    <Col xs='6' className="text-center">{sysInfo.cpu}</Col>
                                </Row>
                                <Row>
                                    <Col xs='6' className="text-center">Arch:</Col>
                                    <Col xs='6' className="text-center">{sysInfo.arch}</Col>
                                </Row>
                                <Row>
                                    <Col xs='6' className="text-center">Cores / Threads:</Col>
                                    <Col xs='6' className="text-center">{`${sysInfo.cpu_count} / ${sysInfo.thread_count}`}</Col>
                                </Row>
                                <Row>
                                    <Col xs='6' className="text-center">OS:</Col>
                                    <Col xs='6' className="text-center">{sysInfo.os}</Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
