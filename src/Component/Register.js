// import React, { useState } from 'react';
// import { register } from '../auth';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password.trim() === '') {
//       setError('Password is required');
//       return;
//     }
//     try {
//       const user = await register(name, email, password);
//       console.log('User created successfully:', user);
//       localStorage.setItem('userId', user.uid);
//       navigate('/dashboard', { state: { userId: user.uid } });
//     } catch (error) {
//       if (error.code === 'auth/email-already-in-use') {
//         setError('Email is already in use');
//       } else {
//         setError(error.message);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//       />
//       <br />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <br />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <br />
//       <button type="submit">Register</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <p>
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </form>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import { register } from '../auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() === '') {
      setError('Password is required');
      return;
    }
    try {
      const { user, shipments } = await register(name, email, password);
      console.log('User created successfully:', user);
      console.log('Initial shipments:', shipments); // Empty array []
      localStorage.setItem('userId', user.uid);
      navigate('/dashboard', { state: { userId: user.uid } });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;