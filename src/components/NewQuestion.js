import * as React from "react";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { saveQuestion } from "../store/data-actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const NewQuestion = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const author = useSelector((state) => state.auth.authUser);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState({
    optionOne: "",
    optionTwo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions((pre) => {
      return { ...pre, [name]: value };
    });
  };
  const handleSubmit = async () => {
    if (options.optionOne.length > 1 && options.optionTwo.length > 1) {
      setLoading(true);
      try {
        await dispatch(
          saveQuestion({
            optionOneText: options.optionOne,
            optionTwoText: options.optionTwo,
            author: author,
          })
        );
        setLoading(false);
        return navigate("/?tab=1");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Card
          sx={{
            mt: 5,
            width: 550,
            mb: 5,
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h4">Create New Question</Typography>
              <Divider />
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                Complete the question:
              </Typography>
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                Would you rather...
              </Typography>
              <TextField
                name="optionOne"
                label="Option One"
                variant="outlined"
                onChange={handleChange}
              />
              <Typography variant="h5">OR</Typography>
              <TextField
                name="optionTwo"
                label="Option Two"
                variant="outlined"
                onChange={handleChange}
              />
              <Box sx={{ pt: 3 }}>
                <LoadingButton
                  loading={loading}
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NewQuestion;
