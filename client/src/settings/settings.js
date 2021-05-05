import { useState, useEffect } from 'react';
import SettingsApi from "api/models/settings";

import { 
    Table,
    Row,
    Col,
    Card,
    CardBody
} from 'reactstrap';

const Settings = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [settings, setSettings] = useState([]);
    const [settingTypes, setSettingTypes] = useState([])

    useEffect(() => {
        SettingsApi.getAll()
            .then((result) => {
                setIsLoaded(true);
                setSettings(result)
                setError(null)
            })
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            })

        SettingsApi.types()
            .then((result) => {
                setSettingTypes(result)
            })
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading Settings...</div>;
    } else {
        return (
            <Row>
                <Col xs="12" className="text-center margin-bottom"><h1>Site Monitor Settings</h1></Col>
                <Col>
                    <Card className="sysinfo-card">
                        <CardBody>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Key</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        settings.map((setting) => {
                                            return (
                                                <tr key={setting.id}>
                                                    <td>{setting.label}</td>
                                                    <td>{setting.key}</td>
                                                    <td>{setting.value}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Settings;