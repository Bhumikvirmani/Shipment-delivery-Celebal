import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, child, get, update, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXeJ2PKf3bUnqrzm3jcXRry4E_hR_QM9c",
  databaseURL: "https://shipment-d4896-default-rtdb.firebaseio.com/",
  authDomain: "shipment-d4896.firebaseapp.com",
  projectId: "shipment-d4896",
  storageBucket: "shipment-d4896.appspot.com",
  messagingSenderId: "789261762476",
  appId: "1:789261762476:web:8a1feff3217bbdf8fec409",
  measurementId: "G-2JXTL7N4TG"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth, ref, push, child, get, update, getDatabase, onValue};
