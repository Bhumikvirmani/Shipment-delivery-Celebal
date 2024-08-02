// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// // import Login from './Login';
// import Login from './Component/Login';
// import Register from './Component/Register';
// import Dashboard from './Component/Dashboard';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from 'react';
import AppRoutes from './Component/AppRoutes';


const App = () => {
  return (
    <AppRoutes />
  );
};

export default App;
