import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
  };
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      <Paper elevation={3}>
        <Box sx={{ minWidth: 500 }}>
          <Grid item>
            <Typography variant="h5" sx={{ mt: 3 }}>
              Welcome to Would You Rather App
            </Typography>
            <Typography sx={{ mt: 1 }}>Please login to continue</Typography>
            <Divider sx={{ mb: 3, mt: 3 }} />
          </Grid>

          <Grid item>
            <img
              width="250"
              src="https://lh3.googleusercontent.com/fo1HqRYHmiuXuxhifM5PkMP5K7BD2vNwQOv5TG-W78zmLtNqpqlKFum-0eWw83yYwDvw"
              alt="Would You Rather"
            />
          </Grid>
          <Grid item>
            <FormControl variant="standard" sx={{ width: 400 }}>
              <InputLabel id="demo-simple-select-label">Select User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                label="User"
                onChange={handleChange}
              >
                {Object.keys(props.users).length > 1 ? (
                  Object.keys(props.users).map((key) => (
                    <MenuItem value={props.users[key].id} key={key}>
                      <ListItemIcon>
                        <Avatar src={props.users[key].avatarURL} />
                      </ListItemIcon>
                      <ListItemText>{props.users[key].name}</ListItemText>
                    </MenuItem>
                  ))
                ) : (
                  <Stack alignItems="center" justifyContent="center">
                    <CircularProgress sx={{ m: 10 }} />
                  </Stack>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              sx={{ mb: 3, mt: 4, width: 400,borderRadius: 25 }}
              variant="contained"
              onClick={() => {
                if (user.length > 1) {
                  dispatch(authActions.login(user));
                  navigate("/");
                }
              }}
            >
              Login
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
