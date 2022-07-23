import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { auth } from "../firebase/firebase.utils";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ButtonAppBar() {
    const [user] = useAuthState(auth);
    console.log(user);
  // const user = false;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant={"dense"}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crypto Change Monitor
          </Typography>
          {user ? (
            <Button onClick={() => auth.signOut()} color="inherit" variant="outlined">
              Logout
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button color="inherit" variant="outlined">
                Login
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
