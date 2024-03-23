import React from 'react';
import { HashRouter } from 'react-router-dom';
import RouteRules from './routes/RouteData.jsx';

const App = () => {
  return (
    <HashRouter>
      <RouteRules />
    </HashRouter>
  );
};

export default App;
