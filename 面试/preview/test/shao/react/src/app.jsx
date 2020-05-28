import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, Login } from "./pages";
//import { Provider } from "react-redux";
//import store from './redux/store';

const PrimartLayout = () => (
  <div className="primary-layout">
    <div>primary head</div>
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </main>
  </div>
);

export const App = () => (
  <BrowserRouter basename="static">
      <PrimartLayout />
    </BrowserRouter>
);
