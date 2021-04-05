import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {isLogged} from "../store/actions"


const Home = () => {
    const logged = useSelector(state => state.isLogged)
    let username = localStorage.getItem("username");
    const dispatch = useDispatch();
    return (

        <div>
            <h3>BIENVENIDO {username}</h3>
        </div>

    );
};

export default Home;
