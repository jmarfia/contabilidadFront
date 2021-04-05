import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionLogout } from "../store/actions"


const Home = () => {
    const logged = useSelector(state => state.isLogged)
    const dispatch = useDispatch();
    function logout() {
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

            {logged ? (
                <>

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
                    <button type="button" onClick={logout}>Logout</button>
                </>

            )
                : (
                    <>


                        <Link to="/register">
                            <button type="button">Registrarse</button>
                        </Link>
                        <Link to="/login">
                            <button type="button">
                                Login
 </button>
                        </Link>
                    </>
                )}


        </div>

    );
};

export default Home;
