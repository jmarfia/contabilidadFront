import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const Movements = () => {
    const [movements, setMovements] = useState([]);


    function getMovements() {
        axios
            .get(
                `http://localhost:3001/api/movements`
            )
            .then((response) => {
                // setMovements((prevState) => [...prevState, ...response.data]);
                setMovements((prevState) => [...response.data]);
            });
    };


    useEffect(() => {
        getMovements();
    }, []);

    function deleteMovement(id) {
        ///api/deletemovement/:id
        let options = {
            method: "delete",
            url: `http://localhost:3001/api/deletemovement/${id}`,
            crossdomain: true,
        };
        axios(options).then((response) => {
            if (response.data != "error") {
                getMovements();
            } else { console.log("ENTORAL ELES", response.data) }
        });
    };

    let mySyle = {
        width: "18rem",
        overflow: "hidden",
        display: "block",
        whiteSpace: "nowrap",
    }

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();


    return (

        <div>
            <h1 id="mayuscula">Movimientos</h1>
            <div className="card-deck product-list">
                {movements.map((movement) => (
                    <div className="col-sm-3">
                        <div className="card mb-3" style={mySyle}>
                            <Button
                                onClick={() => deleteMovement(movement._id)}
                                variant="contained"
                                color="secondary"
                                style={{
                                    position: 'absolute',
                                    right: 5,
                                    top: 5,
                                }}
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            >

                            </Button>

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
