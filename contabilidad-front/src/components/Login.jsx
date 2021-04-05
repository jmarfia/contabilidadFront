import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./styles.css";
import {isLogged} from "../store/actions"




const NewMovement = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const dispatch = useDispatch();


    const login = () => {
        function getUserInfo() {
            let user = {};
            user.username = username;
            user.password = password;
            return user;
        }
        let User = getUserInfo();
        let options = {
            method: "post",
            url: `http://localhost:3001/api/login`,
            crossdomain: true,
            data: User,
        };
        //mandar el post de login y redirect a /movements
        axios(options).then((response) => {
            if (!response.data.auth) {
                setLoginStatus(false)
            } else {
                console.log("hola response", response.data)
                localStorage.setItem("token", response.data.token)
                dispatch(isLogged())
                setLoginStatus(true);
            }
        });
    }
    const userAuth = () => {
        axios.get("http://localhost:3001/api/isAuth",{
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            console.log(response);
        })
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     function getUserInfo() {
    //         let user = {};
    //         user.username = document.getElementById("username").value;
    //         user.password = document.getElementById("password").value;
    //         return user;
    //     }
    //     let User = getUserInfo();

    //     let options = {
    //         method: "post",
    //         url: `http://localhost:3001/api/login`,
    //         crossdomain: true,
    //         data: User,
    //     };
    //     //mandar el post de crear y redirect a /
    //     axios(options).then((response) => {
    //         console.log(response);
    //         //history.push("/movements");

    //     });
    // };
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <h2 className="pt-3"> Login</h2>
                </div>
                <div>
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
                                            setUsername(e.target.value)
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
                                            setPassword(e.target.value)
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
            </div>
            <h1>hola {loginStatus && <button onClick={userAuth}> Check if auth </button>}</h1>
        </div>
    );
};
export default NewMovement;