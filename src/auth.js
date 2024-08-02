
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { db, ref, child, get, update } from './firebase';

// const auth = getAuth();

// const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     const usersRef = ref(db, 'users');
//     const userRef = child(usersRef, user.uid);
//     const userData = await get(userRef);
//     return { user, userData: userData.val(), name: userData.val().name };
//   } catch (error) {
//     throw new Error(`Error logging in: ${error.message}`);
//   }
// };

// const register = async (name, email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     const userData = {
//       uid: user.uid,
//       name,
//       email,
//       authProvider: 'local',
//     };
//     const usersRef = ref(db, 'users');
//     const userRef = child(usersRef, user.uid);
//     await update(userRef, userData);
//     return user;
//   } catch (error) {
//     throw new Error(`Error registering: ${error.message}`);
//   }
// };

// const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     throw new Error(`Error logging out: ${error.message}`);
//   }
// };

// export { login, register, logout };

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { app } from './firebase';

const auth = getAuth(app);
const db = getDatabase(app);

const login = async (email, password) => {
  try {
    if (!email ||!password) {
      throw new Error('Email and password are required');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const usersRef = ref(db, 'users');
    const userRef = child(usersRef, user.uid);
    const userData = await get(userRef);
    if (userData.exists()) {
      const userDataValue = userData.val();
      const name = userDataValue.name || '';
      const shipments = userDataValue.shipments || [];
      return { user, userData: userDataValue, name, shipments };
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};

const register = async (name, email, password) => {
  try {
    if (!name ||!email ||!password) {
      throw new Error('Name, email, and password are required');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = {
      uid: user.uid,
      name,
      email,
      authProvider: 'local',
      shipments: [],
    };
    const usersRef = ref(db, 'users');
    const userRef = child(usersRef, user.uid);
    await set(userRef, userData);
    return user;
  } catch (error) {
    throw new Error(`Error registering: ${error.message}`);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(`Error logging out: ${error.message}`);
  }
};

export { login, register, logout };