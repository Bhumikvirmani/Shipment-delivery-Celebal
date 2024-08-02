import { getDatabase, ref, push, get, update, onValue } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import { set } from 'firebase/database'; 

const db = getDatabase();
const shipmentsRef = ref(db, 'shipments'); // corrected the reference name

const createShipment = async (shipmentData) => {
  const userId = localStorage.getItem('userId'); // Get the current user's ID
  const userRef = ref(db, `users/${userId}`);
  const userData = await get(userRef);
  if (userData.exists()) {
    const shipments = userData.val().shipments || []; // Get the user's shipments array
    const newShipment = { ...shipmentData, id: uuidv4() }; // Create a new shipment object with a unique ID
    shipments.push(newShipment); // Add the new shipment to the array
    await set(userRef, { ...userData.val(), shipments }); // Update the user's data with the new shipment
    return newShipment.id; // Return the new shipment ID
  } else {
    throw new Error('User not found');
  }
};
const fetchAllShipments = async () => {
  try {
    const shipmentsData = [];
    await onValue(shipmentsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const shipment = {
          id: childSnapshot.key,
          ...childSnapshot.val(),
        };
        shipmentsData.push(shipment);
      });
    }, {
      onlyOnce: true,
    });
    return shipmentsData;
  } catch (error) {
    console.error('Error fetching all shipments:', error);
    return null;
  }
};
const getShipmentsByUser = async (userId) => {
  try {
    const shipmentsData = [];
    await onValue(shipmentsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const shipment = {
          id: childSnapshot.key,
          ...childSnapshot.val(),
        };
        if (shipment.userId === userId) {
          shipmentsData.push(shipment);
        }
      });
    }, {
      onlyOnce: true,
    });
    return shipmentsData;
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return null;
  }
};

const getShipmentById = async (shipmentId) => {
  try {
    const shipmentsData = [];
    await onValue(shipmentsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const shipment = {
          id: childSnapshot.key,
          ...childSnapshot.val(),
        };
        shipmentsData.push(shipment);
      });
    }, {
      onlyOnce: true,
    });
    const shipment = shipmentsData.find((shipment) => shipment.id === shipmentId);
    return shipment;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    return null;
  }
};
const updateShipment = async (shipmentId, shipmentData) => {
  try {
    await update(ref(db, `shipments/${shipmentId}`), shipmentData);
    return true;
  } catch (error) {
    console.error('Error updating shipment:', error);
    return false;
  }
};

const updateShipmentStatus = async (shipmentId, status) => {
  try {
    const shipmentRef = ref(db, `shipments/${shipmentId}`);
    await update(shipmentRef, { status });
    return true;
  } catch (error) {
    console.error('Error updating shipment status:', error);
    return false;
  }
};

const deleteShipment = async (shipmentId) => {
  try {
    await ref(db, `shipments/${shipmentId}`).remove();
    return true;
  } catch (error) {
    console.error('Error deleting shipment:', error);
    return false;
  }
};

const fetchShipments = async (userId) => {
  try {
    const shipmentsData = await getShipmentsByUser(userId);
    return shipmentsData;
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return null;
  }
};
export { createShipment, getShipmentsByUser, getShipmentById, updateShipment, updateShipmentStatus, deleteShipment, fetchShipments,fetchAllShipments};

// const createShipment = async (shipmentData) => {
//   try {
//     const shipmentRef = await push(shipmentsRef, shipmentData);
//     return shipmentRef.key;
//   } catch (error) {
//     console.error('Error creating shipment:', error);
//   }
// };


// const getShipmentById = async (shipmentId) => {
//   try {
//     const shipmentsData = [];
//     await onValue(shipmentsRef, (snapshot) => {
//       snapshot.forEach((childSnapshot) => {
//         const shipment = {
//           id: childSnapshot.key,
//           ...childSnapshot.val(),
//         };
//         shipmentsData.push(shipment);
//       });
//     }, {
//       onlyOnce: true,
//     });
//     const shipment = shipmentsData.find((shipment) => shipment.id === shipmentId);
//     return shipment;
//   } catch (error) {
//     console.error('Error fetching shipment:', error);
//     return null;
//   }
// };