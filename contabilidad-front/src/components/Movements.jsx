import React, { useEffect, useState } from "react";
import axios from "axios";


const Movements = () => {
    const [movements, setMovements] = useState([]);
    useEffect(() => {
        axios
            .get(
                `http://localhost:3001/api/movements`
            )
            .then((response) => {
                setMovements((prevState) => [...prevState, ...response.data]);
                console.log(response);
            });
    }, []);
    let mySyle = {
        width: "18rem",
        overflow: "hidden",
        display: "block",
        whiteSpace: "nowrap",
    }
    return (

        <div>
            <h1 id="mayuscula">Movimientos</h1>
            <div className="card-deck product-list">
                {movements.map((movement) => (
                    <div className="col-sm-3">
                        <div className="card mb-3" style={mySyle}>
                            <div className="card-body">
                                <h5 className="card-title">{movement.name}</h5>
                                <p className="card-text"> $ {movement.amount}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Movements;
