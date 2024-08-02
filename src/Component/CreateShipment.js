// import React, { useState } from 'react';
// import { createShipment, updateShipmentStatus } from './shipment';

// const CreateShipment = () => {
//   const [shipmentData, setShipmentData] = useState({
//     senderName: '',
//     senderAddress: '',
//     recipientName: '',
//     recipientAddress: '',
//     packageDetails: '',
//   });
//   const [error, setError] = useState(null);
//   const [shipmentId, setShipmentId] = useState(null);
//   const [status, setStatus] = useState(''); // Add a state for the shipment status
//   const [isAdmin, setIsAdmin] = useState(false); // Add a state to check if the user is an admin

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const id = await createShipment(shipmentData);
//       setShipmentId(id);
//       setShipmentData({
//         senderName: '',
//         senderAddress: '',
//         recipientName: '',
//         recipientAddress: '',
//         packageDetails: '',
//       }); // Clear the form fields after submission.
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setShipmentData({ ...shipmentData, [name]: value });
//   };

//   const handleStatusChange = (event) => {
//     const { value } = event.target;
//     setStatus(value);
//   };

//   const handleUpdateStatus = async () => {
//     if (!isAdmin) {
//       alert('Only admins can update shipment status');
//       return;
//     }
//     try {
//       await updateShipmentStatus(shipmentId, status);
//       alert(`Shipment status updated to ${status}`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="create-shipment-container">
//       <h1 className="title">Create Shipment</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Sender Name:</label>
//         <input
//           type="text"
//           name="senderName"
//           value={shipmentData.senderName}
//           onChange={handleInputChange}
//           className="input-field"
//         />
//         <br />
//         <label>Sender Address:</label>
//         <input
//           type="text"
//           name="senderAddress"
//           value={shipmentData.senderAddress}
//           onChange={handleInputChange}
//           className="input-field"
//         />
//         <br />
//         <label>Recipient Name:</label>
//         <input
//           type="text"
//           name="recipientName"
//           value={shipmentData.recipientName}
//           onChange={handleInputChange}
//           className="input-field"
//         />
//         <br />
//         <label>Recipient Address:</label>
//         <input
//           type="text"
//           name="recipientAddress"
//           value={shipmentData.recipientAddress}
//           onChange={handleInputChange}
//           className="input-field"
//         />
//         <br />
//         <label>Package Details:</label>
//         <input
//           type="text"
//           name="packageDetails"
//           value={shipmentData.packageDetails}
//           onChange={handleInputChange}
//           className="input-field"
//         />
//         <br />
//         <button type="submit" className="submit-button">
//           Create Shipment
//         </button>
//       </form>
//       {error && (
//         <div className="error-message" style={{ color: 'red' }}>
//           {error}
//         </div>
//       )}
//       {shipmentId && (
//         <div>
//           <p>Shipment created successfully!</p>
//           <p>
//             Your shipment ID is: <strong>{shipmentId}</strong>
//           </p>
//           <p>
//             <a href={`/track-order/${shipmentId}`}>Track your order</a>
//           </p>
//           {isAdmin && (
//             <div>
//               <label>Update Shipment Status:</label>
//               <select value={status} onChange={handleStatusChange}>
//                 <option value="">Select Status</option>
//                 <option value="in-transit">In Transit</option>
//                 <option value="delivered">Delivered</option>
//                 <option value="delayed">Delayed</option>
//               </select>
//               <button onClick={handleUpdateStatus}>Update Status</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateShipment;


import React, { useState } from 'react';
import { createShipment, updateShipmentStatus } from './shipment';

const CreateShipment = () => {
  const [shipmentData, setShipmentData] = useState({
    senderName: '',
    senderAddress: '',
    recipientName: '',
    recipientAddress: '',
    packageDetails: '',
  });
  const [error, setError] = useState(null);
  const [shipmentId, setShipmentId] = useState(null);
  const [status, setStatus] = useState(''); // Add a state for the shipment status
  const [isAdmin, setIsAdmin] = useState(false); // Add a state to check if the user is an admin

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const id = await createShipment(shipmentData);
      setShipmentId(id);
      setShipmentData({
        senderName: '',
        senderAddress: '',
        recipientName: '',
        recipientAddress: '',
        packageDetails: '',
      }); // Clear the form fields after submission.
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShipmentData({ ...shipmentData, [name]: value });
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setStatus(value);
  };

  const handleUpdateStatus = async () => {
    if (!isAdmin) {
      alert('Only admins can update shipment status');
      return;
    }
    try {
      await updateShipmentStatus(shipmentId, status);
      alert(`Shipment status updated to ${status}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-shipment-container">
      <h1 className="title">Create Shipment</h1>
      <form onSubmit={handleSubmit}>
        <label>Sender Name:</label>
        <input
          type="text"
          name="senderName"
          value={shipmentData.senderName}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <br />
        <label>Sender Address:</label>
        <input
          type="text"
          name="senderAddress"
          value={shipmentData.senderAddress}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <br />
        <label>Recipient Name:</label>
        <input
          type="text"
          name="recipientName"
          value={shipmentData.recipientName}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <br />
        <label>Recipient Address:</label>
        <input
          type="text"
          name="recipientAddress"
          value={shipmentData.recipientAddress}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <br />
        <label>Package Details:</label>
        <input
          type="text"
          name="packageDetails"
          value={shipmentData.packageDetails}
          onChange={handleInputChange}
          className="input-field"
          required
        />
        <br />
        <button type="submit" className="submit-button">
          Create Shipment
        </button>
      </form>
      {error && (
        <div className="error-message" style={{ color: 'red' }}>
          {error}
        </div>
      )}
      {shipmentId && (
        <div>
          <p>Shipment created successfully!</p>
          <p>
            Your shipment ID is: <strong>{shipmentId}</strong>
          </p>
          <p>
            <a href={`/track-order/${shipmentId}`}>Track your order</a>
          </p>
          {isAdmin && (
            <div>
              <label>Update Shipment Status:</label>
              <select value={status} onChange={handleStatusChange}>
                <option value="">Select Status</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="delayed">Delayed</option>
              </select>
              <button onClick={handleUpdateStatus}>Update Status</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateShipment;