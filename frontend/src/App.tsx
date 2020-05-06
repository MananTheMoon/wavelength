import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import "./App.css";
import { createStore } from "./store/store";

function App() {
  const store = createStore();
  console.log("store", store);
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:team" component={Home} />
      </Switch>
    </Provider>
  );
}

export default App;
