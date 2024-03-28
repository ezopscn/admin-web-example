import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthRouter } from './routes/RouteMatch.jsx';
import RouteRules from './routes/RouteRules.jsx';

const App = () => {
  return (
    <HashRouter>
      <AuthRouter>
        <RouteRules />
      </AuthRouter>
    </HashRouter>
  );
};

export default App;
