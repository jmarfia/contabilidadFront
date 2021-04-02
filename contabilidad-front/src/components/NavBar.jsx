import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {actionLogout} from "../store/actions"


const Home = () => {
    const logged = useSelector(state => state.isLogged)
    const dispatch = useDispatch();
    function logout(){
        localStorage.removeItem("token")
        dispatch(actionLogout())
    }

    return (

        <div>
            <Link to="/">
                <button type="button">
                    Home
     </button>
            </Link>
            <Link to="/Movements">
                <button type="button">
                    Ver todos los movimientos
     </button>
            </Link>
            <Link to="/NewMovement">
                <button type="button">
                    Crear nuevo movimiento
     </button>
            </Link>
            {logged ? <button type="button"> Ya tas logueado papu </button>
                : <Link to="/register">
                    <button type="button">
                        Registrarse
     </button>
                </Link>}
                <Link to="/login">
                <button type="button">
                    Login
     </button>
            </Link>
            <button type="button" onClick={logout}>
                    Logout
     </button>
                </div>

    );
};

export default Home;