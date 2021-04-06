import React from "react";

const Home = () => {
    let username = localStorage.getItem("username");
    return (

        <div>
            <h3>BIENVENIDO {username}</h3>
        </div>

    );
};

export default Home;
