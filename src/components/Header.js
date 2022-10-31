import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@mui/material";

export default function ButtonAppBar() {
  const [user] = useAuthState(auth);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant={"dense"}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", boxShadow: "none", color: "inherit" }}
          >
            Crypto Change Monitor
          </Typography>
          {user ? (
            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                to="/correlation"
                color="inherit"
                variant="outlined"
              >
                Correlation
              </Button>
              <Button
                onClick={() => auth.signOut()}
                color="inherit"
                variant="outlined"
              >
                Logout
              </Button>
            </Stack>
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
