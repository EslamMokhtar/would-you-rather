import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const ListCard = (props) => {
  return (
    <Grid item>
      <Card
        sx={{
          width: 450,
          maxHeight: 200,
          mb: 5,
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6" sx={{ textAlign: "left" }}>
            {props.users[props.questions[props.id].author].name} asks:
          </Typography>
          <Divider variant="middle" />
          <Stack spacing={1} direction="row">
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={props.users[props.questions[props.id].author].avatarURL}
              alt="User image"
            />
            <div />
            <div />
            <div />
            <Stack spacing={2}>
              <Typography component="div" variant="body1" sx={{ mt: 2 }}>
                Would You Rather
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                _{props.questions[props.id].optionOne.text}_
              </Typography>

              <Button
                variant="outlined"
                sx={{ width: 200,borderRadius: 25 }}
                component={Link}
                to={`/questions/${props.id}`}
              >
                View Poll
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ListCard;
