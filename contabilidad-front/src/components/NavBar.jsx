import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const logged = useSelector(state => state.loggedReducer)

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

                </div>

    );
};

export default Home;
