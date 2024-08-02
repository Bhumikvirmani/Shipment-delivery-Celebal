import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';

const AdminPanel = () => {
  const db = getDatabase();
  const [users, setUsers] = useState([]);
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = ref(db, 'users');
      onValue(usersRef, (snapshot) => {
        const usersData = [];
        snapshot.forEach((childSnapshot) => {
          const user = {
            id: childSnapshot.key,
            ...childSnapshot.val(),
          };
          usersData.push(user);
        });
        setUsers(usersData);
      });
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchShipments = async () => {
      const shipmentsData = [];
      await Promise.all(users.map(async (user) => {
        const userShipmentsRef = ref(db, `users/${user.id}/shipments`);
        onValue(userShipmentsRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const shipment = {
              id: childSnapshot.key,
              userId: user.id,
              ...childSnapshot.val(),
            };
            shipmentsData.push(shipment);
          });
        });
      }));
      setShipments(shipmentsData);
    };

    fetchShipments();
  }, [users]);

  const handleShipmentStatusUpdate = async (shipmentId, newStatus) => {
    try {
      const shipmentRef = ref(db, `users/${shipmentId}/shipments/${shipmentId}`);
      await update(shipmentRef, { status: newStatus });
      console.log(`Shipment ${shipmentId} status updated to ${newStatus}`);
    } catch (error) {
      console.error(`Error updating shipment status: ${error}`);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Shipment ID</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.senderName}</td>
              <td>{shipment.id}</td>
              <td>{shipment.status}</td>
              <td>
                <button onClick={() => handleShipmentStatusUpdate(shipment.id, 'in_transit')}>Update Status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;