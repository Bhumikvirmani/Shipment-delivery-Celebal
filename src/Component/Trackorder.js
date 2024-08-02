import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getShipmentById } from './shipment';

const TrackOrder = () => {
  const { shipmentId } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const db = getDatabase();
    const shipmentRef = ref(db, `shipments/${shipmentId}`);
    onValue(shipmentRef, (snapshot) => {
      const shipmentData = snapshot.val();
      setShipment(shipmentData);
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });
  }, [shipmentId]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Track Order</h1>
      <p>Shipment ID: {shipmentId}</p>
      <ul>
        <li>
          <strong>Sender Name:</strong> {shipment.senderName}
        </li>
        <li>
          <strong>Sender Address:</strong> {shipment.senderAddress}
        </li>
        <li>
          <strong>Recipient Name:</strong> {shipment.recipientName}
        </li>
        <li>
          <strong>Recipient Address:</strong> {shipment.recipientAddress}
        </li>
        <li>
          <strong>Package Details:</strong> {shipment.packageDetails}
        </li>
        <li>
          <strong>Status:</strong> {shipment.status}
        </li>
      </ul>
    </div>
  );
};

export default TrackOrder;
