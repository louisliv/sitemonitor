import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface EditModalProps {
  show: boolean;
  data?: any | null;
  onClose: () => void;
  onSave: (formData: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ show, onClose, onSave, data }) => {
  const [formData, setFormData] = React.useState<any>({});


  React.useEffect(() => {
    if (data) setFormData(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleClose = () => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({});
    }
    onClose();
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Label</Form.Label>
            <Form.Control type="text" placeholder="Enter label" value={formData.label} name="label" onChange={handleChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Key</Form.Label>
            <Form.Control type="text" placeholder="Enter key" value={formData.key} name="key" onChange={handleChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Value</Form.Label>
            <Form.Control type="text" placeholder="Enter value" value={formData.value} name="value" onChange={handleChange}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
