import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "./Notification";
import useTable from "./useTable";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const headCells=[
    {id:"Movement", label:"Where the money goes"},
    {id:"Amount", label:"How much money"},
    {id: "Delete", label:"Delete"}
]

const Movements = () => {
  const [movements, setMovements] = useState([]);
  const [error, setError] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const { TblContainer, TblHead } = useTable(movements, headCells);

  function getMovements() {
    let options = {
      method: "get",
      url: `http://localhost:3001/api/movements`,
      crossdomain: true,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    axios(options).then((response) => {
      if (response.data.auth === false) {
        setError(["necesita autenticarse"]);
      } else {
        setError("");
        setMovements((prevState) => [...response.data]);
      }
    });
  }
  useEffect(() => {
    getMovements();
  }, []);

  async function deleteMovement(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      let options = {
        method: "delete",
        url: `http://localhost:3001/api/deletemovement/${id}`,
        crossdomain: true,
      };
      try {
        console.log("el id", id);
        await axios(options);
        getMovements();
        setNotify({
          isOpen: true,
          message: "Deleted successfully",
          type: "success",
        });
      } catch (err) {
        console.log("ENTORAL ELES", err);
      }
    }
  }

  let myStyle = {
    width: "18rem",
    overflow: "hidden",
    display: "block",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <TblContainer>
            <TblHead />
          <TableBody>
            {movements.map((movement) => (
              <TableRow key={movement._id}>
                <TableCell>{movement.name}</TableCell>
                <TableCell>${movement.amount}</TableCell>
                <TableCell>
                <Button
          onClick={() => deleteMovement(movement._id)}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        ></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Movements;

{
  /* <h1 id="mayuscula">Movimientos</h1>
<h2>{error}</h2>
<div className="card-deck product-list">
  {movements.map((movement) => (
    <div className="col-sm-3">
      <div className="card mb-3" style={myStyle}>
        <Button
          onClick={() => deleteMovement(movement._id)}
          variant="contained"
          color="secondary"
          style={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
          startIcon={<DeleteIcon />}
        ></Button>

        <div className="card-body">
          <h5 className="card-title">{movement.name}</h5>
          <p className="card-text"> $ {movement.amount}</p>
        </div>
      </div>
    </div>
  ))}
</div>
<Notification notify={notify} setNotify={setNotify} /> */
}
