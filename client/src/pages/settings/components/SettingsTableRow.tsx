
import React from 'react';

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import EditModal from './EditModal';

interface SettingsTableRowProps {
  settingData: any;
  onUpdate: (settingData: any) => void;
  onDelete: (settingData: any) => void;
}

const SettingsTableRow: React.FC<SettingsTableRowProps> = ({ settingData, onUpdate, onDelete }) => {
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);

  const handleUpdate = async (formData: any) => {
    try {
      await onUpdate(formData);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating:', error);
      throw error;
    }
  }

  return (
    <>
      <tr>
        <td>{settingData.label}</td>
        <td>{settingData.key}</td>
        <td>{settingData.value}</td>
        <td className="d-flex">
          <Button variant="primary" className="mr-2" onClick={() => setShowEditModal(true)}>
            <FontAwesomeIcon icon={faPencil} />
          </Button>
          <Button variant="danger" onClick={() => onDelete(settingData)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </td>
      </tr>
      <EditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
        data={settingData}
      />
    </>
  );
};

export default SettingsTableRow;
