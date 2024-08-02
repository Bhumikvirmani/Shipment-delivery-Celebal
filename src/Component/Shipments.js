import React, { useState, useEffect } from 'react';
import { getShipment } from './shipment';
import { Link } from 'react-router-dom';

const Shipments = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      const shipmentsData = await getShipment();
      setShipments(shipmentsData);
    };
    fetchShipments();
  }, []);

  return (
    <div>
      <h1>My Shipments</h1>
      <table>
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Sender Name</th>
            <th>Recipient Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.senderName}</td>
              <td>{shipment.recipientName}</td>
              <td>{shipment.status}</td>
              <td>
                <Link to={`/track-order/${shipment.id}`}>Track</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shipments;