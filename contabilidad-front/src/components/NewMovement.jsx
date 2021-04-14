import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NewMovement = () => {
  let history = useHistory();
  const [error, setError] = useState("");
  const baseURL = process.env.REACT_APP_BASE_URL


  async function createUser(User) {
    let options = {
      method: "post",
      url: `${baseURL}/api/newmovement`,
      crossdomain: true,
      data: User,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    try {
      await axios(options);
      setError("");
      history.push("/movements");
    } catch (err) {
      setError(["necesita autenticarse"]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    function getUserInfo() {
      let user = {};
      user.name = document.getElementById("name").value;
      user.amount = document.getElementById("amount").value;
      user.type = document.getElementById("type").value;
      return user;
    }
    let User = getUserInfo();
    createUser(User);
  };
  return (
    <div className="wrapper">
      <h2>{error} </h2>
      <div id="formContent">
        <div className="">
          <h2 className="pt-3"> Registro</h2>
        </div>
        <div>
          <form>
            <div className="row mt-3">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Name"
                  ></input>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    className="form-control"
                    placeholder="Amount"
                  ></input>
                </div>
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="type"
                id="type"
                className="form-control"
                placeholder="Type (1 o 0)"
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
export default NewMovement;
