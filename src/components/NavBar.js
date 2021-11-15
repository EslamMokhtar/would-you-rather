import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
          "&.active": {
            background: "#ff4573"
          },
          "&:hover": {
            background: "#ff4573"
          }
        }
      }
    }
  }
});
const Login = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              component={NavLink}
              to="/"
            >
              <img
                width="40"
                src="https://lh3.googleusercontent.com/fo1HqRYHmiuXuxhifM5PkMP5K7BD2vNwQOv5TG-W78zmLtNqpqlKFum-0eWw83yYwDvw"
                alt="Would You Rather"
              />
            </IconButton>
            <ThemeProvider theme={theme}>
              <Stack direction="row" spacing={10}>
                <Button component={NavLink} to="/">
                  Home
                </Button>
                <Button component={NavLink} to="/new-question">
                  New Question
                </Button>
                <Button component={NavLink} to="/leader-board">
                  Leader Board
                </Button>
              </Stack>
            </ThemeProvider>

            <Avatar
              src={
                props.users[props.authUser] &&
                props.users[props.authUser].avatarURL
              }
              variant="contained"
              component={NavLink}
              to="/login"
            ></Avatar>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Login;
