import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Chip from "@mui/material/Chip";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

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
const AnsweredCard = (props) => {
  const userVote = props.questions[props.questionId].optionOne.votes.includes(
    props.authUser
  );

  const total =
    props.questions[props.questionId].optionOne.votes.length +
    props.questions[props.questionId].optionTwo.votes.length;

  const style = {
    backgroundColor: "#F0F8FF",
    boxShadow: 2,
    borderRadius: 5,
    p: 1,
  };
  return (
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
          {props.questions[props.questionId].optionOne.text} ?
        </Typography>
        <BorderLinearProgress
          variant="determinate"
          value={
            (props.questions[props.questionId].optionOne.votes.length / total) *
            100
          }
        />
        <Typography variant="body2" color="gray">
          {(
            (props.questions[props.questionId].optionOne.votes.length / total) *
            100
          ).toFixed()}
          %
        </Typography>
        <Typography>
          {props.questions[props.questionId].optionOne.votes.length} out of{" "}
          {total} votes
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
          {props.questions[props.questionId].optionTwo.text} ?
        </Typography>
        <BorderLinearProgress
          variant="determinate"
          value={
            (props.questions[props.questionId].optionTwo.votes.length / total) *
            100
          }
        />
        <Typography variant="body2" color="gray">
          {(
            (props.questions[props.questionId].optionTwo.votes.length / total) *
            100
          ).toFixed()}
          %
        </Typography>
        <Typography>
          {props.questions[props.questionId].optionTwo.votes.length} out of{" "}
          {total} votes
        </Typography>
      </Box>
    </Stack>
  );
};

export default AnsweredCard;
