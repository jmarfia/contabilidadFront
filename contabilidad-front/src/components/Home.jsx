import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {isLogged} from "../store/actions"


const Home = () => {
    const logged = useSelector(state => state.loggedReducer)
    const dispatch = useDispatch();
    return (

        <div>
            <h3>BIENVENIDO {logged}</h3>
            <button onClick={() => dispatch(isLogged())}>LOGIN HD</button>
            {logged ? <div> tas logueado papu </div> : <div> NO tas logueado papu </div>}
        </div>

    );
};

export default Home;
