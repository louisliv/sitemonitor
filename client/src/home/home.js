import { useState, useEffect, useReducer } from 'react';
import Monitor from "api/models/monitor";
import SystemInfo from "api/models/systemInfo";

import { 
    Row,
    Col,
    Card,
    CardBody
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { PercentPieChart, CpuTempsChart } from "_components";

const reducer = (state, action) => {
    switch(action.type) {
        case "assign":
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [state, dispatch] = useReducer(reducer, {});
    const [sysInfo, setSysInfo] = useState({})

    useEffect(() => {
        const intervalId = setInterval(() => {  
            Monitor.getAll()
                .then((result) => {
                    setIsLoaded(true);
                    dispatch({type: "assign", payload: result});
                    setError(null)
                })
                .catch((error) => {
                    setIsLoaded(true);
                    setError(error);
                })
        }, 5000)

        SystemInfo.getAll()
            .then((result) => {
                setSysInfo(result)
            })
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            })
        
        return () => clearInterval(intervalId);
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="margin-top"><FontAwesomeIcon icon={faSpinner} spin size="5x"/></div>;
    } else {
        return (
            <div>
                <Row className="margin-bottom">
                    <Col xs="12" className="text-center margin-bottom"><h1>Site Monitor</h1></Col>
                    <Col xs="12" md="4">
                        <div className="text-center label-margin-bottom">CPU Utilization</div>
                        <PercentPieChart systemData={state.cpu_usage}/>
                    </Col>
                    <Col xs="12" md="4">
                        <div className="text-center label-margin-bottom margin-top-mobile">HDD Utilization</div>
                        <PercentPieChart systemData={state.hdd_percent}
                            secondaryLabel={`${state.hdd_used}/${state.hdd_total} Used`}
                            />
                    </Col>
                    <Col xs="12" md="4">
                        <div className="text-center label-margin-bottom margin-top-mobile">Memory Utilization</div>
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
            </div>
        );
    }
}

export default Home;