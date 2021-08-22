import React from "react";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { Switch, Route, Router } from 'react-router-dom';

import Customer from "./components/Customer";
import Mortgage from "./components/Mortgage";
import ShowMortgage from "./components/ShowMortgage";

import history from "./history";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Router history={history}>
          <Container maxWidth="lg">
            <div  className="divApp-header" >
              <h2 >Mortgage Application</h2>
            </div>
            <Switch>
              <Route path="/" exact component={Customer} />
              <Route path="/customer" exact component={Customer} />
              <Route path="/Mortgage" exact component={Mortgage} />
              <Route path="/ShowMortgage" component={ShowMortgage} />
            </Switch>

            {/* <DCandidates /> */}
          </Container>
        </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;
