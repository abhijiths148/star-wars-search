import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux";
import './css/App.css';

import Layout from "./components/layout/Layout";

const { store, persistor } = configureStore();

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter>
            <Switch>
              <Route path="/" name="Home" component={Layout} />
            </Switch>
          </HashRouter>
        </PersistGate>
      </Provider>
      </div>
    );
  }
}

export default App;
