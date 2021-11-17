import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import { useParams, useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const Question = (props) => {
  const urlParams = useParams();
  const navigate = useNavigate();
  const questionId = urlParams.id;
  const answeredQuestion = props.users[props.authUser].answers[questionId];

  const userVote = props.questions[questionId].optionOne.votes.includes(
    props.authUser
  );

  const [value, setValue] = React.useState("");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.length > 1) {
      return console.log(value);
    }
  };
  const total =
    props.questions[questionId].optionOne.votes.length +
    props.questions[questionId].optionTwo.votes.length;

  const style = {
    backgroundColor: "#F0F8FF",
    boxShadow: 2,
    borderRadius: 5,
    p: 1,
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
            <Typography component="div" variant="h6" sx={{ textAlign: "left" }}>
              Asked by {props.users[props.questions[questionId].author].name}
            </Typography>
            <Divider variant="middle" />
            <Stack spacing={1} direction="row">
              <CardMedia
                component="img"
                sx={{ width: 150, borderRadius: 10 }}
                image={
                  props.users[props.questions[questionId].author].avatarURL
                }
                alt="User image"
              />
              <div />
              <div />
              <div />
              {!answeredQuestion ? (
                <form onSubmit={handleSubmit}>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <Stack spacing={1}>
                      <FormLabel component="legend">
                        Would You Rather...
                      </FormLabel>
                      <RadioGroup
                        aria-label="quiz"
                        name="quiz"
                        value={value}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="optionOne"
                          control={<Radio />}
                          label={props.questions[questionId].optionOne.text}
                        />

                        <FormControlLabel
                          value="optionTwo"
                          control={<Radio />}
                          label={props.questions[questionId].optionTwo.text}
                        />
                      </RadioGroup>

                      <Button
                        sx={{ mt: 1, mr: 1 }}
                        type="submit"
                        variant="outlined"
                      >
                        Submit
                      </Button>
                    </Stack>
                  </FormControl>
                </form>
              ) : (
                <Stack spacing={2} sx={{ width: 300, pt: 2 }}>
                  <Typography variant="h5" sx={{ textAlign: "left" }}>
                    Results:
                  </Typography>
                  <Box sx={userVote ? style : {}}>
                    {userVote && (
                      <Chip
                        icon={<CheckCircleIcon />}
                        color="success"
                        label="Your Vote"
                        variant="outlined"
                      />
                    )}
                    <Typography sx={{ mt: 1 }}>
                      {props.questions[questionId].optionOne.text} ?
                    </Typography>
                    <BorderLinearProgress
                      variant="determinate"
                      value={
                        (props.questions[questionId].optionOne.votes.length /
                          total) *
                        100
                      }
                    />
                    <Typography>
                      {props.questions[questionId].optionOne.votes.length} out
                      of {total} votes
                    </Typography>
                  </Box>
                  <Box sx={!userVote ? style : {}}>
                    {!userVote && (
                      <Chip
                        icon={<CheckCircleIcon />}
                        color="success"
                        label="Your Vote"
                        variant="outlined"
                      />
                    )}
                    <Typography sx={{ mt: 1 }}>
                      {props.questions[questionId].optionTwo.text} ?
                    </Typography>
                    <BorderLinearProgress
                      variant="determinate"
                      value={
                        (props.questions[questionId].optionTwo.votes.length /
                          total) *
                        100
                      }
                    />
                    <Typography>
                      {props.questions[questionId].optionTwo.votes.length} out
                      of {total} votes
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>
        <Button
          sx={{ mt: 1, mr: 1 }}
          size="large"
          type="submit"
          onClick={() => navigate(-1)}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default Question;
