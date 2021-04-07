import HomePage from "./components/Home";
import NavBar from "./components/NavBar";
import LoginComponent from "./components/Login";
import Movements from "./components/Movements";
import NewMovement from "./components/NewMovement";
import RegisterForm from "./components/RegisterForm";
import Container from '@material-ui/core/Container';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => (
  <Router>
    <NavBar />
    <Container maxWidth="lg">
    <Switch>
      <Route exact path="/">
        <HomePage />
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
      <Route path="/login">
        <LoginComponent />
      </Route>

    </Switch>
    </Container>
  </Router>
);

export default App;