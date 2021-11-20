import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import UnansweredCard from "../cards/UnansweredCard";
import AnsweredCard from "../cards/AnsweredCard";
import Error from "./Error";

const Question = (props) => {
  const urlParams = useParams();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.authUser);
  const [submit, setSubmit] = React.useState(false);
  const questionId = urlParams.id;
  const answeredQuestion = props.users[authUser].answers[questionId];
  const checkQid = Object.keys(props.questions).includes(questionId);

  if (!checkQid) {
    return <Error />;
  }

  const submitUrl = () => {
    setSubmit(true);
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
                <UnansweredCard
                  questions={props.questions}
                  authUser={authUser}
                  questionId={questionId}
                  submitUrl={submitUrl}
                />
              ) : (
                <AnsweredCard
                  questionId={questionId}
                  authUser={authUser}
                  questions={props.questions}
                />
              )}
            </Stack>
          </CardContent>
        </Card>
        <Button
          sx={{ mt: 1, mr: 1 }}
          size="large"
          type="submit"
          onClick={() => (!submit ? navigate(-1) : navigate("/?tab=0"))}
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
