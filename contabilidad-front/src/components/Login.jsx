import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { isLogged } from "../store/actions";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const login = () => {
    function getUserInfo() {
      let user = {};
      user.username = username;
      user.password = password;
      return user;
    }
    let User = getUserInfo();

    async function sendCredentials(credentials) {
      let options = {
        method: "post",
        url: `http://localhost:3001/api/login`,
        crossdomain: true,
        data: User,
      };
      try {
        const response = await axios(options);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        dispatch(isLogged());
        setLoginStatus(true);
        console.log(response, "RESPONSE BIEN LOGUEADO");
        history.push("/");
      } catch (err) {
        setLoginStatus(false);
        console.log(err, "ERROR DE LOGIN");
      }
    }
    sendCredentials(User);
  };

  return (
    <div id="formContent">
        <h2 className="pt-3"> Login</h2>
      <form>
        <div className="row mt-3">
          <div className="col-xs-6 col-sm-6 col-md-6">
            <div className="form-group">
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6">
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <input
          type="button"
          value="Login"
          className="btn btn-outline-success "
          onClick={login}
        ></input>
      </form>
    </div>
  );
};
export default LoginComponent;
