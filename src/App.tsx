import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { configureStore } from 'modules/redux-store';
import 'normalize.css';
import 'css/app.css';
import { AppLayout } from 'modules/app';

const App: React.FC = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
