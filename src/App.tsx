import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Users } from './pages/users';
import { Orders } from './pages/orders';
import { Login } from './pages/login/Login';
import ReduxProvider from './providers/ReduxProvider';
import { ProtectedRoute } from './context/ProtectedRoute';
import { Unauthorized } from './pages/Unauthorized';

function App() {
  return (
    <ReduxProvider>
      <MantineProvider theme={{colors: {brand: ['#592151','#5F519C','#631e4b','#782246','#db8a8f','#5F519C','#db8a8f','#ad2c3c','#9e283e','#8c2542']}}}>
        <Notifications position="top-right" zIndex={1000} />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* Protected routes */}
            <Route path="/users" element={<ProtectedRoute roles={['Admin']}><Users /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute roles={['User']}><Orders /></ProtectedRoute>} />
            <Route path="/*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ReduxProvider>
  )
}

export default App
