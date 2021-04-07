import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  Button,
  TablePagination,
  TableSortLabel,
  Toolbar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "./Notification";
import Report from "./Report";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#FFFbf2",
      cursor: "pointer",
    },
  },
}));

const headCells = [
  { id: "createdAt", label: "Date" },
  { id: "name", label: "Where the money goes" },
  { id: "amount", label: "How much money" },
  { id: "delete", label: "Delete" },
];

const Movements = () => {
  const [movements, setMovements] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  async function getMovements() {
    let options = {
      method: "get",
      url: `http://localhost:3001/api/movements`,
      crossdomain: true,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios(options);
      if (response.data.auth === false) {
        setNotify({
          isOpen: true,
          message: "LogIn First!",
          type: "warning",
        });
      } else {
        setMovements((prevState) => [...response.data]);
      }
    } catch (err) {
      console.log(err);
    }
  }

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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const movementsAfterPagingAndSorting = () => {
    return stableSort(movements, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };
  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };
  function getDate(date){
    const parsedDate =  new Date(date)
    return parsedDate.toDateString() 
  }

  useEffect(() => {
    getMovements();
  }, []);

  return (
    <>
      <Paper className={classes.pageContent}>
        <div>
          <Report movimientos={movements} />
        </div>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {
                      handleSortRequest(headCell.id);
                    }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movementsAfterPagingAndSorting().map((movement) => (
              <TableRow key={movement._id}>
                <TableCell>{getDate(movement.createdAt)}</TableCell>
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
        </Table>
        <TablePagination
          rowsPerPageOptions={pages}
          component="div"
          rowsPerPage={rowsPerPage}
          count={movements.length}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
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
