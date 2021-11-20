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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
          "&.active": {
            background: "#ff4573",
          },
          "&:hover": {
            background: "#ff4573",
          },
        },
      },
    },
  },
});
const Login = (props) => {
  const isAuth = useSelector((state) => state.auth.isAauth);
  const authUser = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    if (isAuth) {
      dispatch(authActions.logout());
      return navigate("/login");
    }
  };
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
              {isAuth && (
                <Stack direction="row" spacing={10}>
                  <Button component={NavLink} to="/">
                    Home
                  </Button>
                  <Button component={NavLink} to="/add">
                    New Question
                  </Button>
                  <Button component={NavLink} to="/leaderboard">
                    Leader Board
                  </Button>
                </Stack>
              )}
            </ThemeProvider>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              {isAuth && <Typography>{props.users[authUser].name}</Typography>}
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar
                  src={props.users[authUser] && props.users[authUser].avatarURL}
                  variant="contained"
                ></Avatar>
              </IconButton>
            </Stack>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {!isAuth ? (
                <MenuItem onClick={handleClose} component={NavLink} to="/login">
                  Login
                </MenuItem>
              ) : (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              )}
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Login;
