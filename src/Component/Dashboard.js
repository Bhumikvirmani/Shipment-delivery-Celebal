import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDatabase, ref, get, update} from 'firebase/database';
import { logout } from '../auth';
import CreateShipment from './CreateShipment';
import TrackOrder from './Trackorder';
import { fetchShipments, getShipmentById, updateShipment, updateShipmentStatus, deleteShipment } from './shipment';
import './Dashboard.css';
import EditShipment from './EditShipment';

const Dashboard = () => {
  const location = useLocation();
  const { state } = location;
  const userId = state?.userId; // Get the user ID from the state
  const isAdmin = state?.isAdmin; // Get the admin status from the state

  const db = getDatabase(); // Initialize the database
  const usersRef = ref(db, 'users');
  const shipmentsRef = ref(db, 'shipments');
  const [user, setUser] = useState({});
  const [shipments, setShipments] = useState([]);
  const [shipmentId, setShipmentId] = useState('');
  const [shipmentStatus, setShipmentStatus] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [userName, setUserName] = useState(''); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = ref(db, `users/${userId}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();
        setUser(userData);
        setUserName(userData.name);
      } catch (error) {
        setError('Error fetching user: ' + error.message);
      }
    };
    fetchUser();

    const fetchShipments = async () => {
      try {
        const userRef = ref(db, `users/${userId}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();
        const shipmentsData = userData.shipments || []; // Get the shipments array from the user's node
        setShipments(shipmentsData);
        console.log('Shipments data:', shipments); // Move the console.log here
      } catch (error) {
        setError('Error fetching shipments: ' + error.message);
      }
    };
    fetchShipments();
  }, [userId]);

  const handleShipmentUpdate = async (shipmentId, shipmentData) => {
    try {
      await updateShipment(shipmentId, shipmentData);
      setSuccess('Shipment updated successfully!');
      // Refresh the shipments list
      const fetchShipments = async () => {
        try {
          const shipmentsData = await fetchShipments(userId);
          setShipments(shipmentsData);
        } catch (error) {
          setError('Error fetching shipments: ' + error.message);
        }
      };
      fetchShipments();
    } catch (error) {
      setError('Error updating shipment: ' + error.message);
    }
  };

  const handleShipmentStatusUpdate = async (shipmentId, status) => {
  if (!isAdmin) {
    setError('Only admins can update shipment status');
    return;
  }
  try {
    await updateShipmentStatus(shipmentId, status);
    setSuccess('Shipment status updated successfully!');
    fetchShipments(); // Call fetchShipments again to update the shipments state
  } catch (error) {
    setError('Error updating shipment status: ' + error.message);
  }
};

  const handleShipmentDelete = async (shipmentId) => {
    try {
      await deleteShipment(shipmentId);
      setSuccess('Shipment deleted successfully!');
      // Refresh the shipments list
      const fetchShipments = async () => {
        try {
          const shipmentsData = await fetchShipments(userId);
          setShipments(shipmentsData);
        } catch (error) {
          setError('Error fetching shipments: ' + error.message);
        }
      };
      fetchShipments();
    } catch (error) {
      setError('Error deleting shipment: ' + error.message);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to the login page
      window.location.href = '/login';
    } catch (error) {
      setError('Error logging out: ' + error.message);
    }
  };

 return (
  <div className="dashboard-container">
    <h1>Dashboard</h1>
    {userId ? (
      <div>
        <div class="logout-container">
            <span class="username">Welcome, {userName}!</span>
            <button class="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <table className="shipments-table">
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Status</th>
              <th>Details</th>
              <th>Modification</th>
            </tr>
            </thead>
<tbody>
  {shipments && shipments.map((shipment) => (
    <tr key={shipment.id}>
      <td>{shipment.id}</td>
      <td>{shipment.status}</td>
      <td>
        <ul>
          <li>Sender Name: {shipment.senderName}</li>
          <li>Sender Address: {shipment.senderAddress}</li>
          <li>Recipient Name: {shipment.recipientName}</li>
          <li>Recipient Address: {shipment.recipientAddress}</li>
          <li>Package Details: {shipment.packageDetails}</li>
        </ul>
      </td>
      <td>
        {isAdmin ? (
          <div className="modification-buttons">
            <button className="update-button" onClick={() => handleShipmentStatusUpdate(shipment.id, 'in_transit')}>Update Status</button>
            <button className="delete-button" onClick={() => handleShipmentDelete(shipment.id)}>Delete</button>
            <button className="cancel-button" onClick={() => handleShipmentStatusUpdate(shipment.id, 'cancelled')}>Cancel</button>
          </div>
        ) : (
          <div className="modification-buttons">
            <div className="admin-notes">
              <span>Status can only be updated by admins</span>
              <span>Only admins can delete shipments</span>
            </div>
            {shipment.status !== 'cancelled' && (
              <button className="cancel-button" onClick={() => handleShipmentStatusUpdate(shipment.id, 'cancelled')}>Cancel</button>
            )}
            <button className="track-button" onClick={() => setShipmentId(shipment.id)}>TrackEdit</button>
            <button className="edit-button">Edit</button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {shipmentId && (
          <TrackOrder shipmentId={shipmentId} />
        )}
        <CreateShipment />
      </div>
    ) : (
      <p>You are not logged in. Please <Link to="/login">login</Link> to access your dashboard.</p>
    )}
  </div>
);
}
export default Dashboard;