import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Layout /> : <Login />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;