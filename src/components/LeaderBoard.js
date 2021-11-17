import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const LeaderBoard = (props) => {
  const sortedUsers = Object.keys(props.users).sort(
    (a, b) =>
      props.users[b].questions.length +
      Object.keys(props.users[b].answers).length -
      (props.users[a].questions.length +
        Object.keys(props.users[a].answers).length)
  );

  const color = { 0: "#FEE101", 1: "#A7A7AD", 2: " #824A02" };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {sortedUsers.map((key, index) => (
        <Grid item key={key}>
          <Card
            sx={{
              mt: 5,
              width: 550,
              mb: 5,
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <CardMedia
                  component="img"
                  sx={{ width: 150, borderRadius: 10 }}
                  image={props.users[key].avatarURL}
                  alt="User image"
                />
                <Divider orientation="vertical" flexItem />
                <Stack
                  spacing={2}
                  direction="column"
                  sx={{ textAlign: "left" }}
                >
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    {props.users[key].name}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Typography variant="body2">Answered questions</Typography>
                    <Typography variant="body2">
                      {Object.keys(props.users[key].answers).length}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Typography variant="body2">Created questions</Typography>
                    <Typography variant="body2">
                      {props.users[key].questions.length}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Score</Typography>
                  {index < 3 && (
                    <EmojiEventsIcon fontSize='large' sx={{ color: color[index],mt:1 }} />
                  )}
                  <Typography
                    sx={{
                      backgroundColor: index < 3 ? color[index] : "#ff4573",
                      borderColor: index < 3 ? color[index] : "#ff4573",
                      color: "white",
                      borderWidth: 20,
                      borderStyle: "solid",
                      borderRadius: 5,
                  
                    }}
                    variant="h4"
                  >
                    {Object.keys(props.users[key].answers).length +
                      props.users[key].questions.length}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LeaderBoard;
