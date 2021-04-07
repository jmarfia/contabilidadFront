import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
  
const RegisterForm = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    function getUserInfo() {
      let user = {};
      user.firstName = document.getElementById("first_name").value;
      user.lastName = document.getElementById("last_name").value;
      user.username = document.getElementById("username").value;
      user.address = document.getElementById("address").value;
      user.phone = document.getElementById("phone").value;
      user.password = document.getElementById("password").value;

      return user;
    }

    let User = getUserInfo();

    let options3 = {
      method: "post",
      url: `http://localhost:3001/api/register`,
      crossdomain: true,
      data: User,
    };
    console.log(User, "user de registerform");
    axios(options3).then((response) => {
      let dataTotal = { user: [User], token: response.token };
      dispatch({
        type: "SAVE_USER",
        payload: dataTotal,
      });
      history.push("/");
    });
  };
  return (
    <div className="wrapper">
      <div id="formContent">
      <div >
      <h2 className="pt-3"> Registro</h2>
    </div>
        <div>
          <form>
            <div className="row mt-3">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                    placeholder="First Name"
                  ></input>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                    placeholder="Last Name"
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="username"
                id="username"
                className="form-control input-sm w-75 ml-5"
                placeholder="username"
              ></input>
            </div>
            <div className="form-group">
              <input
                type="address"
                name="address"
                id="address"
                className="form-control input-sm  w-75 mr-5 ml-5"
                placeholder="Address"
              ></input>
            </div>
            <div className="form-group">
              <input
                type="phone"
                name="phone"
                id="phone"
                className="form-control input-sm  w-75 mr-5 ml-5"
                placeholder="Phone"
              ></input>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control input-sm w-75 mr-5 ml-5"
                placeholder="Password"
              ></input>
            </div>

            <input
              type="submit"
              value="Register"
              className="btn btn-outline-success "
              onClick={handleSubmit}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
