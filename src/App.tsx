import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Globaltyle from './styles/global';

import AppRoutes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
        <Globaltyle />
      </Router>
    </>
  );
};
export default App;
