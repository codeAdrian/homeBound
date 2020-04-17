import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from 'modules/redux-store';
import { Routing } from 'modules/routing';
import 'normalize.css';
import 'css/app.css';

const App: React.FC = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
