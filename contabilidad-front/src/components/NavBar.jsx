import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionLogout } from "../store/actions";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Container,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },

});

const NavBar = () => {
  const logged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();

  async function logout() {
    try {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      dispatch(actionLogout());
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container className={classes.navbarDisplayFlex}>
            <IconButton edge="start" color="inherit" aria-label="home">
              <a href="/" key="Home" className={classes.linkText}>
                {" "}
                <Home fontSize="large" />
              </a>
            </IconButton>

            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {logged ? (
                <>
                  <a
                    href="/Movements"
                    key="Movimientos"
                    className={classes.linkText}
                  >
                    <ListItem button>
                      <ListItemText primary="Ver" />
                    </ListItem>
                  </a>

                  <a
                    href="/NewMovement"
                    key="Crear movimiento"
                    className={classes.linkText}
                  >
                    <ListItem button>
                      <ListItemText primary="Crear" />
                    </ListItem>
                  </a>
                  <ListItem
                    button
                    onClick={logout}
                    className={classes.linkText}
                  >
                    <ListItemText primary="LogOut" />
                  </ListItem>
                </>
              ) : (
                <>
                  <a
                    href="/register"
                    key="Registrarse"
                    className={classes.linkText}
                  >
                    <ListItem button>
                      <ListItemText primary="Registrarse" />
                    </ListItem>
                  </a>
                  <a href="/login" key="Login" className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </a>
                </>
              )}
            </List>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
