import React, { useState } from 'react';

const EditShipment = ({ shipment, onClose, onUpdate }) => {
  const [form, setForm] = useState(shipment);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(shipment.userId, shipment.id, form); // Pass userId, shipmentId, and form
      onClose();
    } catch (error) {
      console.error('Error updating shipment:', error);
    }
  };

  return (
    <div className="edit-shipment-container">
      <h2>Edit Shipment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Sender Name:
          <input
            type="text"
            name="senderName"
            value={form.senderName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Sender Address:
          <input
            type="text"
            name="senderAddress"
            value={form.senderAddress}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Recipient Name:
          <input
            type="text"
            name="recipientName"
            value={form.recipientName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Recipient Address:
          <input
            type="text"
            name="recipientAddress"
            value={form.recipientAddress}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Package Details:
          <input
            type="text"
            name="packageDetails"
            value={form.packageDetails}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditShipment;