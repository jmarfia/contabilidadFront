import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Movements from "./components/Movements";
import NewMovement from "./components/NewMovement";
import RegisterForm from "./components/RegisterForm";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/movements">
        <Movements />
      </Route>
      <Route exact path="/newMovement">
        <NewMovement />
      </Route>
      <Route path="/register">
        <RegisterForm />
      </Route>

    </Switch>
  </Router>
);

export default App;