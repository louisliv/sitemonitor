import React, { useEffect, useState } from 'react';

import { Table, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import api from '../../utils/api';

import SettingsTableRow from './components/SettingsTableRow';
import EditModal from './components/EditModal';

const Settings: React.FC = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/system-settings');
        setFields(response.data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchData();
  }, []);

  const createNewSetting = async (settingData: any) => {
    try {
      const response = await api.post('/system-settings/', settingData);

      const data = response.data;

      setFields([...fields, data]);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error creating new setting:', error);
    }
  }

  const updateSetting = async (settingData: any) => {
    try {
      const response = await api.put(`/system-settings/${settingData.id}/`, settingData);

      const data = response.data;

      const index = fields.findIndex((field) => field.id === settingData.id);

      const newFields = [...fields];
      newFields[index] = data;

      setFields(newFields);
    } catch (error) {
      console.error('Error updating setting:', error);
      throw error;
    }
  }

  const deleteSetting = async (settingData: any) => {
    try {
      await api.delete(`/system-settings/${settingData.id}/`);

      const newFields = fields.filter((field) => field.id !== settingData.id);

      setFields(newFields);
    } catch (error) {
      console.error('Error deleting setting:', error);
    }
  }

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex">
          <h1>Settings</h1>
          <div className="flex-grow-1"></div>
          <div className="p-2">
            <Button variant="success" onClick={() => setShowEditModal(true)}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <EditModal
              show={showEditModal}
              onClose={() => setShowEditModal(false)}
              onSave={createNewSetting}
            />
          </div>
        </div>
      </Col>
      <Col xs={12}>
        <Table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Key</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <SettingsTableRow 
                key={field.key}
                settingData={field}
                onUpdate={updateSetting}
                onDelete={deleteSetting}
              />
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Settings;
