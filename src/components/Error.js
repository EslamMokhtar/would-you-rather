import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item>
        <Stack spacing={5}>
          <Typography variant="h1">404</Typography>
          {/* <Divider orientation="vertical" flexItem /> */}
          <Typography variant="h3">Page Not found</Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            We're sorry, the page you requested could not be found <br /> Please
            go back to the homepage
          </Typography>
        </Stack>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{
            mt: 5,
            "&:hover": {
              background: "#ff4573",
            },
          }}
        >
          Go Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default Error;
